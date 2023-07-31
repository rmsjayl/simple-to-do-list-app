import React, { useState, useEffect } from "react";
import TODOLISTSTYLE from "styles/components/todolist.module.css";
import EDITICONRED from "icons/edit-icon-red.svg";
import EDITICON from "icons/edit-icon.svg";
import DELETEICON from "icons/delete-icon.svg";
import { Buttons } from "assets/Buttons";
import { instance } from "api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ToDoList = ({ header }) => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [configTask, setConfigTask] = useState(false);
  const [taskId, setTaskId] = useState(null);
  const [taskData, setTaskData] = useState({
    taskName: "",
    taskDescription: "",
  });

  useEffect(() => {
    const getTasks = async () => {
      await instance
        .get("/")
        .then((response) => {
          toast.success(response.data.message);
          setTasks(response.data.data);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    };

    getTasks();
  }, []);

  const handleChange = (event, name) => {
    setTaskData({ ...taskData, [name]: event.target.value });
  };

  const isClicked = () => {
    configTask ? setConfigTask(false) : setConfigTask(true);
  };

  const createTask = async (e) => {
    e.preventDefault();
    await instance
      .post("/", taskData)
      .then((response) => {
        toast.success(response.data.message);
        setTasks([...tasks, response.data.data]);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const deleteTask = async (id) => {
    await instance
      .delete(`/${id}`)
      .then((response) => {
        toast.success(response.data.message);
        setTasks(tasks.filter((task) => task.taskId !== id));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <>
      <div className={TODOLISTSTYLE.container}>
        <div className={TODOLISTSTYLE.header}>{header}</div>
        <div className={TODOLISTSTYLE.addtask}>
          {!configTask ? (
            <Buttons buttonStyle={"btn-add"} onClick={() => isClicked()}>
              Add Task
            </Buttons>
          ) : (
            <Buttons buttonStyle={"btn-danger"} onClick={() => isClicked()}>
              Close
            </Buttons>
          )}
        </div>
        <table className={TODOLISTSTYLE.tabledata}>
          <thead>
            <tr>
              <th> No. </th>
              <th> Task Name </th>
              <th> Task Description </th>
              <th> Task Created </th>
              <th colSpan={2}> Actions </th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, id) => {
              const { taskId, taskName, taskDescription, createdAt } = task;

              return (
                <tr key={id}>
                  <td>{tasks.indexOf(task) + 1}</td>
                  <td> {taskName} </td>
                  <td> {taskDescription} </td>
                  <td>
                    {new Date(createdAt)
                      .toLocaleString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })
                      .replace("at", ",")}
                  </td>
                  <td>
                    <img
                      src={EDITICON}
                      alt=""
                      onClick={() => navigate("/edit/" + taskId)}
                    />
                  </td>
                  <td>
                    <img
                      src={DELETEICON}
                      alt=""
                      onClick={() => deleteTask(taskId)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {configTask && (
          <div className={TODOLISTSTYLE.configure}>
            <div>
              <div className={TODOLISTSTYLE.header}>Add Task</div>
              <form className={TODOLISTSTYLE.form}>
                <div className={TODOLISTSTYLE.taskNameInput}>
                  <label> Task Name</label>
                  <input
                    onChange={(event) => handleChange(event, "taskName")}
                    className={TODOLISTSTYLE.userInput}
                    type="text"
                  />
                </div>

                <div className={TODOLISTSTYLE.taskNameInput}>
                  <label> Task Description </label>
                  <input
                    onChange={(event) => handleChange(event, "taskDescription")}
                    className={TODOLISTSTYLE.userInput}
                    type="text"
                  />
                </div>

                <div className={TODOLISTSTYLE.confirmButton}>
                  <Buttons buttonStyle={"btn-add"} onClick={createTask}>
                    Save Task
                  </Buttons>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ToDoList;
