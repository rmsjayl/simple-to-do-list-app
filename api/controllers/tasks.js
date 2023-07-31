const Task = require("../models/tasks");

exports.gettaskid = async (req, res) => {
  const task = await Task.findByPk(req.params.id);

  try {
    if (!task) {
      return res.status(404).send({
        success: false,
        message: "Task not found.",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Task retrieved successfully.",
      data: task,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error.",
      error: error.message,
    });
  }
};

exports.gettasks = async (req, res) => {
  const task = await Task.findAll();

  try {
    if (task.length <= 0) {
      return res.status(404).send({
        success: false,
        message: "No available tasks for now.",
      });
    }

    if (!task) {
      return res.status(404).send({
        success: false,
        message: "No task found.",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Task retrieved successfully.",
      data: task,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error.",
      error: error.message,
    });
  }
};

exports.createtasks = async (req, res) => {
  const { taskName, taskDescription } = req.body;

  try {
    if (!taskName) {
      return res.status(400).send({
        success: false,
        message: "Task name is required.",
      });
    }

    if (!taskDescription) {
      return res.status(400).send({
        success: false,
        message: "Task description is required.",
      });
    }

    const existingTask = await Task.findOne({
      where: {
        taskName,
      },
    });

    if (existingTask) {
      return res.status(400).send({
        success: false,
        message: "Task already exists.",
      });
    }

    const task = await Task.create({
      ...req.body,
    });

    return res.status(201).send({
      success: true,
      message: "Task created successfully.",
      data: task,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error.",
      error: error.message,
    });
  }
};

exports.deletetasks = async (req, res) => {
  const task = await Task.findByPk(req.params.id);

  try {
    if (!task) {
      return res.status(404).send({
        success: false,
        message: "Task not found.",
      });
    }

    await task.destroy();

    return res.status(200).send({
      success: true,
      message: "Task deleted successfully.",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error.",
      error: error.message,
    });
  }
};

exports.updatetasks = async (req, res) => {
  const task = await Task.findByPk(req.params.id);

  const { taskName, taskDescription } = req.body;

  try {
    if (!task) {
      return res.status(404).send({
        success: false,
        message: "Task not found.",
      });
    }

    if (!taskName) {
      return res.status(400).send({
        success: false,
        message: "Task Name is required.",
      });
    }

    if (!taskDescription) {
      return res.status(400).send({
        success: false,
        message: "Task Description is required.",
      });
    }

    // if the user did not update the task name and task description throw an error
    if (
      taskName === task.taskName &&
      taskDescription === task.taskDescription
    ) {
      return res.status(400).send({
        success: false,
        message: "Task name and task description must be updated.",
      });
    }

    const existingTask = await Task.findOne({
      where: {
        taskName,
      },
    });

    if (existingTask) {
      return res.status(400).send({
        success: false,
        message: "Task already exists.",
      });
    }

    await task.update(req.body);

    return res.status(200).send({
      success: true,
      message: "Task updated successfully.",
      data: task,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error.",
      error: error.message,
    });
  }
};
