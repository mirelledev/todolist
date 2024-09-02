import express from "express";
import validate from "../middlewares/handleValidation";
const {
  addTask,
  getUserTasks,
  deleteTask,
  updateTask,
} = require("../controllers/TaskController");
import {
  addTaskValidation,
  taskUpdateValidation,
} from "../middlewares/taskValidation";
import authGuard from "../middlewares/authGuard";

const router = express.Router();

router.post("/", authGuard, addTaskValidation(), validate, addTask);

router.delete("/:id", authGuard, deleteTask);

router.get("/", authGuard, getUserTasks);

router.put("/:id", authGuard, taskUpdateValidation(), validate, updateTask);

module.exports = router;
