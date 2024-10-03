import React, { useEffect, useState } from "react";
import { useTaskStore } from "../store/taskStore";
import Modal from "./Modal";

interface EditTaskModalProps {
  taskId: number | null; // taskId est nullable (null au début)
  isOpen: boolean;
  onClose: () => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  taskId,
  isOpen,
  onClose,
}) => {
  const { getTaskById, updateTask } = useTaskStore();
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);

  // Récupérer la tâche quand taskId ou isOpen change
  useEffect(() => {
    if (taskId !== null && isOpen) {
      const task = getTaskById(taskId);
      if (task) {
        setTitle(task.title);
        setCompleted(task.completed);
      }
    }
  }, [taskId, isOpen, getTaskById]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskId !== null) {
      updateTask(taskId, { title, completed });
      onClose(); // Ferme le modal après la mise à jour
    }
  };

  if (!isOpen) return null;

  return (
    <Modal title="Éditer la tâche" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="task-title"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Titre de la Tâche
        </label>
        <input
          id="task-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="block w-full border border-gray-300 rounded-md p-2 mb-4"
        />

        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={completed}
            onChange={() => setCompleted(!completed)}
            className="form-checkbox"
          />
          <span className="ml-2">Complétée</span>
        </label>

        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700"
          >
            Mettre à jour
          </button>
          <button
            type="button"
            onClick={onClose}
            className="ml-2 bg-gray-200 text-gray-700 rounded-md px-4 py-2 hover:bg-gray-300"
          >
            Annuler
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditTaskModal;
