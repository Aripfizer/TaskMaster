import { useState } from "react";
import { useTaskStore } from "../store/taskStore";
import formatCurrentDate from "../utils/formatDate";
import TaskModal from "../components/AddTaskModal";
import EditTaskModal from "../components/EditTaskModal";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { useToast } from "../Providers/ToastProvider";
import { Bounce } from "react-toastify";

interface DragState {
  [key: string]: { x: number; y: number };
}

const TaskManager = () => {
  const [filter, setFilter] = useState<undefined | boolean>(undefined);
  const { notify } = useToast();

  const { tasks, getTaskStats, deleteTask } = useTaskStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number>(0);

  const filteredTasks = tasks.filter((task) => {
    if (filter === undefined) return true; // Afficher toutes les tâches
    return task.completed === filter; // Filtrer selon l'état de complétion
  });

  const notifySuccess = () =>
    notify(`La tache a été supprimer`, {
      type: "info",
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });

  const [isDragging, setIsDragging] = useState(false);

  const openEditModal = (taskId: number) => {
    if (!isDragging) {
      setSelectedTaskId(taskId);
      setIsEditModalOpen(true);
    }
  };

  const [draggedTaskId, setDraggedTaskId] = useState<number | null>(null);
  const [dragPositions, setDragPositions] = useState<DragState>({});

  const handleDrag = (taskId: number, data: DraggableData) => {
    setDraggedTaskId(taskId);
    setDragPositions((prev) => ({ ...prev, [taskId]: { x: data.x, y: 0 } }));
    setIsDragging(true);
  };

  const handleDragStop = (taskId: number, data: DraggableData) => {
    setTimeout(() => setIsDragging(false), 0);
    if (Math.abs(data.x) > 100) {
      deleteTask(taskId);
      notifySuccess();
    } else {
      setDragPositions((prev) => ({ ...prev, [taskId]: { x: 0, y: 0 } }));
    }

    setDraggedTaskId(null);
  };

  return (
    <>
      <TaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      <EditTaskModal
        taskId={selectedTaskId}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />

      <main className="w-full min-h-[100vh] bg-[rgb(171,173,176)] bg-gradient-to-t from-gray-400 via-gray-300 to-gray-100 flex items-center justify-center">
        <div className="max-w-lg w-full max-h-[90vh] overflow-y-scroll overflow-x-hidden mx-4 sm:x-10 bg-gray-100 p-8 rounded-xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[6.9px]">
          <h2 className="flex items-center justify-center mb-5 text-center bg-gray-50 text-xl sm:text-2xl text-gray-700 font-bold uppercase py-4 px-2 shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="sm:size-7 size-6 mr-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
              />
            </svg>
            task-master
          </h2>
          <div className="flex items-center justify-between flex-wrap">
            <div>
              <h3 className="sm:text-xl text-lg font-bold text-gray-700">
                Aujourd'hui
              </h3>
              <p className="text-gray-400 font-medium text-xs">
                {formatCurrentDate(new Date())}
              </p>
            </div>

            <div>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center sm:text-base text-sm sm:py-2 sm:px-4 px-2 py-1 bg-blue-100 hover:bg-blue-200 rounded border border-blue-300 text-sky-900 font-semibold transition duration-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="sm:size-5 size-4 mr-1"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                Nouvelle tache
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between flex-wrap gap-2 sm:text-base text-sm font-medium sm:mt-5 mt-3">
            <button
              className={`flex items-center space-x-1 ${
                filter === undefined ? "text-sky-700 font-bold" : null
              }`}
              onClick={() => setFilter(undefined)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="sm:size-5 size-3"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              <div>Tout</div>
              <div
                className={`py-1] px-1 rounded-full text-gray-50 text-xs ${
                  filter === undefined
                    ? " bg-sky-700 font-bold"
                    : "bg-gray-300 "
                }`}
              >
                {getTaskStats().totalTasks}
              </div>
            </button>
            <button
              className={`flex items-center space-x-1 ${
                filter === true ? "text-sky-700 font-bold" : null
              }`}
              onClick={() => setFilter(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="sm:size-5 size-3"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
                />
              </svg>
              <div>Terminer</div>
              <div
                className={`py-1] px-1 rounded-full text-gray-50 text-xs ${
                  filter === true ? " bg-sky-700 font-bold" : "bg-gray-300 "
                }`}
              >
                {getTaskStats().completedTasks}
              </div>
            </button>
            <button
              className={`flex items-center space-x-1 ${
                filter === false ? "text-sky-700 font-bold" : null
              }`}
              onClick={() => setFilter(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="sm:size-5 size-3"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                />
              </svg>
              <div>En cours</div>
              <div
                className={`py-1] px-1 rounded-full text-gray-50 text-xs ${
                  filter === false ? " bg-sky-700 font-bold" : "bg-gray-300 "
                }`}
              >
                {getTaskStats().inProgressTasks}
              </div>
            </button>
          </div>
          <div className="sm:mt-8 mt-4 space-y-4">
            {filteredTasks.length === 0 ? (
              <div className="text-center text-gray-500">
                <p>Aucune tâche à afficher 🙄</p>
              </div>
            ) : (
              [...filteredTasks].reverse().map((task) => (
                <Draggable
                  key={task.id}
                  axis="x"
                  bounds={{ left: -150, right: 150 }}
                  position={dragPositions[task.id] || { x: 0, y: 0 }}
                  onDrag={(e: DraggableEvent, data: DraggableData) =>
                    handleDrag(task.id, data)
                  }
                  onStop={(e: DraggableEvent, data: DraggableData) =>
                    handleDragStop(task.id, data)
                  }
                >
                  <div
                    title="Cliquer glisser pour supprimer"
                    onClick={() => openEditModal(task.id)}
                    className={`relative bg-gray-100 rounded shadow-[0_4px_30px_rgba(0,0,0,0.1)] p-4 sm:p-6 cursor-pointer ${
                      task.completed ? "line-through" : ""
                    } transition-all duration-300 border-2 ${
                      draggedTaskId === task.id
                        ? "border-red-600"
                        : "border-transparent"
                    } ${
                      draggedTaskId === task.id
                        ? "before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:flex before:items-center before:justify-center before:bg-red-100 before:bg-opacity-75 before:text-red-600 before:text-xl"
                        : ""
                    }`}
                  >
                    {draggedTaskId === task.id && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6 text-red-600 mb-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                        <span className="text-red-600 text-xl">Supprimer</span>
                      </div>
                    )}
                    <div className="flex items-start justify-between pb-3 border-b border-gray-200">
                      <h2 className="text-lg font-semibold text-gray-800">
                        {task.title}
                      </h2>
                      <div>
                        {task.completed ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="#0ea5e9"
                            className="size-6"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="#d4d4d8"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div className="pt-3 font-medium text-gray-400 text-base">
                      {formatCurrentDate(task.createdAt, true)}
                    </div>
                  </div>
                </Draggable>
              ))
            )}
          </div>
        </div>
      </main>
    </>

    // <div className="task-manager">
    //   <input
    //     type="text"
    //     value={newTask}
    //     onChange={(e) => setNewTask(e.target.value)}
    //     placeholder="Enter a task"
    //     className="border p-2 mb-4"
    //   />
    //   <button
    //     onClick={handleAddTask}
    //     className="bg-blue-500 text-white px-4 py-2 rounded"
    //   >
    //     Add Task
    //   </button>

    //   <ul className="mt-4">
    //     {tasks.map((task) => (
    //       <li key={task.id} className="flex items-center space-x-4">
    //         <span className={task.completed ? "line-through" : ""}>
    //           {task.title}
    //         </span>
    //         <button
    //           onClick={() => toggleTaskStatus(task.id)}
    //           className="text-blue-600"
    //         >
    //           {task.completed ? "Undo" : "Complete"}
    //         </button>
    //       </li>
    //     ))}
    //   </ul>
    // </div>
  );
};

export default TaskManager;
