// UserRoutes.ts
import express from "express";
const {
  register,
  login,
  getUserInfo,
} = require("../controllers/UserController");
import validate from "../middlewares/handleValidation";
import {
  userCreateValidation,
  loginUserValidation,
} from "../middlewares/userValidations";
import authGuard from "../middlewares/authGuard";

const router = express.Router();

// Utilize userCreateValidation como uma função
router.post("/register", userCreateValidation(), validate, register);
router.post("/login", loginUserValidation(), validate, login);
router.get("/", authGuard, getUserInfo);

module.exports = router;
