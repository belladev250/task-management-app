const express = require("express");
const {
  getTasks,
  registerTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const router = express.Router();

router.get("/", getTasks);
router.post("/", registerTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
