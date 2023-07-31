const express = require("express");
const router = express.Router();

const {
  gettaskid,
  gettasks,
  createtasks,
  deletetasks,
  updatetasks,
} = require("../controllers/tasks");

router.get("/", gettasks);
router.get("/:id", gettaskid);
router.post("/", createtasks);
router.delete("/:id", deletetasks);
router.put("/:id", updatetasks);

module.exports = router;
