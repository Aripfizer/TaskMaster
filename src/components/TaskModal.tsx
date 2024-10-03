import React, { useEffect, useRef, useState } from "react";
import { useTaskStore } from "../store/taskStore";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose }) => {
  const { addTask } = useTaskStore();

  const [title, setTitle] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (title.trim() !== "") {
      addTask(title);
      setTitle(""); // Clear input after adding task
    }

    onClose();
  };

  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus(); // Donne le focus à l'input
    }
    if (isOpen) {
      const timer = setTimeout(() => setIsAnimating(true), 300);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !isAnimating) return null;
  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black bg-opacity-60 h-screen w-full flex justify-center items-start md:items-center pt-10 md:pt-0 transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`relative max-w-sm w-full bg-white rounded shadow-lg transition-all duration-1000 ${
            isOpen
              ? "opacity-100 transform translate-y-0 scale-100"
              : "opacity-0 transform -translate-y-full scale-150"
          }`}
        >
          <button
            onClick={onClose}
            className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-2xl w-10 h-10 rounded-full focus:outline-none text-white transition duration-500"
          >
            &times;
          </button>

          <div className="px-4 py-3 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-600">
              Ajouter une nouvelle tache
            </h2>
          </div>

          <div className="w-full p-3">
            <form onSubmit={handleSubmit}>
              <label
                htmlFor="task-title"
                className="block text-sm font-medium text-gray-700 mb-4"
              >
                Titre de la Tâche
              </label>
              <input
                ref={inputRef}
                id="task-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="block w-full border-2 border-gray-400 focus:border-sky-600  outline-none rounded-md p-2 mb-4"
              />
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 transition duration-500"
                >
                  Ajouter
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="ml-2 text-white bg-red-500 hover:bg-red-600 rounded-md px-4 py-2 transition duration-500"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskModal;
