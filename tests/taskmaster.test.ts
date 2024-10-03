import { useTaskStore } from "../src/store/taskStore";

describe("Task Store", () => {
  beforeEach(() => {
    const { tasks } = useTaskStore.getState();
    tasks.length = 0;
  });

  it("should add a new task", () => {
    const store = useTaskStore.getState();
    store.addTask("New Task");

    const tasks = useTaskStore.getState().tasks;

    expect(tasks.length).toBe(1);
    expect(tasks[0].title).toBe("New Task");
    expect(tasks[0].completed).toBe(false);
  });

  it("should toggle the status of a task", () => {
    const { addTask, toggleTaskStatus } = useTaskStore.getState();
    // Ajout d'une tâche
    addTask("Test Task");
    const tasks = useTaskStore.getState().tasks;

    const taskId = tasks[0].id;

    // Vérifiez que la tâche n'est pas complétée
    expect(tasks[0].completed).toBe(false);

    // Toggles le statut de la tâche
    toggleTaskStatus(taskId);

    // Récupérez l'état mis à jour
    const updatedTasks = useTaskStore.getState().tasks;
    expect(updatedTasks[0].completed).toBe(true); // La tâche doit maintenant être complétée

    // Basculez à nouveau pour vérifier que cela fonctionne dans les deux sens
    toggleTaskStatus(taskId);
    const updatedTasksAgain = useTaskStore.getState().tasks;

    expect(updatedTasksAgain[0].completed).toBe(false); // Retourne à non complété
  });

  it("should delete a task", () => {
    const { addTask, deleteTask } = useTaskStore.getState();

    // Ajouter une tâche
    addTask("Task to be deleted");

    const tasks = useTaskStore.getState().tasks;

    expect(tasks.length).toBe(1); // Vérifiez que la tâche a été ajoutée

    // Récupérer l'ID de la tâche ajoutée
    const taskId = tasks[0].id;

    // Supprimer la tâche
    deleteTask(taskId);

    // Récupérer l'état mis à jour des tâches
    const updatedTasks = useTaskStore.getState().tasks;

    // Vérifiez que la tâche a été supprimée
    expect(updatedTasks.length).toBe(0);
  });
});
