import { create } from "zustand";

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface TaskStore {
  tasks: Task[];
  addTask: (title: string) => void;
  toggleTaskStatus: (id: number) => void;
  updateTask: (id: number, updatedData: { title: string; completed?: boolean }) => void;
  deleteTask: (id: number) => void;
  getTaskById: (id: number) => Task | undefined;
  getTaskStats: () => {
    totalTasks: number;
    completedTasks: number;
    inProgressTasks: number;
  };
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],

  // Ajouter une nouvelle tâche
  addTask: (title) => {
    const timestamp = new Date();
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          id: Date.now(), // Génère un identifiant unique basé sur l'heure actuelle
          title,
          completed: false,
          createdAt: timestamp,
          updatedAt: timestamp,
        },
      ],
    }));
  },

  // Basculer le statut d'une tâche (completed/en cours)
  toggleTaskStatus: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed, updatedAt: new Date() }
          : task
      ),
    })),

  // Mettre à jour le titre (et potentiellement le statut) d'une tâche
  updateTask: (id, { title, completed }) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              title: title !== undefined ? title : task.title,
              completed: completed !== undefined ? completed : task.completed,
              updatedAt: new Date(),
            }
          : task
      ),
    })),

  // Supprimer une tâche par son ID
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),

  // Récupérer une tâche par son ID
  getTaskById: (id) => {
    const { tasks } = get();
    return tasks.find((task) => task.id === id);
  },

  // Statistiques des tâches : total, complétées et en cours
  getTaskStats: () => {
    const { tasks } = get();
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.completed).length;
    const inProgressTasks = totalTasks - completedTasks;

    return {
      totalTasks,
      completedTasks,
      inProgressTasks,
    };
  },
}));
