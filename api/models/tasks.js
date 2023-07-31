const Sequelize = require("sequelize");
const db = require("../config/db");

const Task = db.define(
  "task",
  {
    taskId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    taskName: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    taskDescription: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Task;
