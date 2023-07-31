const db = require("../config/db");
const Task = require("./tasks");

Task.sync();

module.exports = db;
