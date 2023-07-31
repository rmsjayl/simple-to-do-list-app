import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import TODOLISTSTYLE from "styles/components/todolist.module.css";
import { instance } from "api/axios";
import { Buttons } from "assets/Buttons";

const EditToDoList = ({ header }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [taskData, setTaskData] = useState({
    taskName: "",
    taskDescription: "",
  });

  useEffect(() => {
    const getTask = async () => {
      await instance
        .get(`/${id}`)
        .then((response) => {
          toast.success(response.data.message);
          setTaskData(response.data.data);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    };

    getTask();
  }, []);

  const handleChange = (event, name) => {
    setTaskData({ ...taskData, [name]: event.target.value });
  };

  const editTask = async (e) => {
    e.preventDefault();
    await instance
      .put(`/${id}`, taskData)
      .then((response) => {
        toast.success(response.data.message);
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className={TODOLISTSTYLE.container}>
      <div className={TODOLISTSTYLE.header}>
        {header}
        <div>
          <div className={TODOLISTSTYLE.header}>Update Task</div>
          <form className={TODOLISTSTYLE.form}>
            <div className={TODOLISTSTYLE.taskNameInput}>
              <label> Task Name</label>
              <input
                value={taskData.taskName}
                onChange={(event) => handleChange(event, "taskName")}
                className={TODOLISTSTYLE.userInput}
                type="text"
              />
            </div>

            <div className={TODOLISTSTYLE.taskNameInput}>
              <label> Task Description </label>
              <input
                value={taskData.taskDescription}
                onChange={(event) => handleChange(event, "taskDescription")}
                className={TODOLISTSTYLE.userInput}
                type="text"
              />
            </div>

            <div className={TODOLISTSTYLE.confirmButton}>
              <div>
                <Buttons buttonStyle={"btn-update"} onClick={editTask}>
                  Update Task
                </Buttons>
              </div>
              <div>
                <Buttons buttonStyle={"btn"} onClick={() => navigate("/")}>
                  Go Back
                </Buttons>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditToDoList;
