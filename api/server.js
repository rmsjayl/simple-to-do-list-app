require("dotenv").config({ path: ".env" });
const express = require("express");
const app = express();

//SERVER PORT
const PORT = process.env.PORT || 5000;
const taskRoutes = require("./routes/tasks");

//IMPORT THE DATABASE
const models = require("./config/db");

app.use(express.json());

app.use("/tasks", taskRoutes);

models
  .sync()
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((error) => console.log(error));
