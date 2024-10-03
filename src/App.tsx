import TaskManager from "./pages/TaskManager";
import ToastProvider from "./Providers/ToastProvider";

function App() {
  return (
    <>
      <ToastProvider>
        <TaskManager />
      </ToastProvider>
    </>
  );
}

export default App;
