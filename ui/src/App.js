import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToDoList from "components/ToDoList";
import EditToDoList from "components/EditToDoList";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={<ToDoList header={"Simple to do list application"} />}
          />
          <Route
            path="/edit/:id"
            element={<EditToDoList header={"Simple to do list application"} />}
          />
        </Routes>
      </Router>
      <ToastContainer theme="colored" hideProgressBar={true} autoClose={3000} />
    </div>
  );
}

export default App;
