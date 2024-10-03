import React, { useEffect, useState } from "react";

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, isOpen, onClose, children }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
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
        className={`fixed inset-0 z-50 bg-black bg-opacity-60 h-screen w-full flex justify-center items-center transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`relative max-w-sm w-full bg-white rounded shadow-lg transition-all duration-1000 mx-5 ${
            isOpen
              ? "opacity-100 transform translate-y-0 scale-100"
              : "opacity-0 transform -translate-y-full scale-150"
          }`}
        >
          <button
            onClick={onClose}
            className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 sm:text-2xl text-xl sm:size-10 size-8 rounded-full focus:outline-none text-white transition duration-500"
          >
            &times;
          </button>

          <div className="px-4 py-3 border-b border-gray-200">
            <h2 className="sm:text-xl text-lg font-semibold text-gray-600">
              {title}
            </h2>
          </div>

          <div className="w-full p-3">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
