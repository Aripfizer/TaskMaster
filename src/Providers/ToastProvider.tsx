// ToastProvider.tsx
import React, { createContext, useContext, ReactNode } from "react";
import { ToastContainer, toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Créer un contexte pour le toast
interface ToastContextProps {
  notify: (message: string, options?: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

// Créer un hook pour utiliser le toast dans les composants
export const useToast = (): ToastContextProps => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast doit être utilisé dans ToastProvider");
  }
  return context;
};

// Créer un ToastProvider pour envelopper votre application
const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const notify = (message: string, options?: ToastOptions) => {
    toast(message, options);
  };

  return (
    <ToastContext.Provider value={{ notify }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

export default ToastProvider;
