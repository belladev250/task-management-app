import "./App.scss";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import EditTask from "./components/EditTask";
import TaskList from "./components/TaskList";
import New from "./components/New";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="tasks" />} />
          <Route path="tasks">
            <Route index element={<TaskList />} />
            <Route path="edit">
              <Route path=":taskId" element={<EditTask />} />
            </Route>
            <Route path="new" element={<New />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
