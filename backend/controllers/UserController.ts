import User from "../models/User";
import { Request, Response } from "express";
import { Types } from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { IGetUserAuthInfoRequest } from "../@types/express";
dotenv.config();

const bcrypt = require("bcryptjs");

const jwtSecret = process.env.JWT_SECRET as string;

const generateToken = (id: Types.ObjectId): string => {
  return jwt.sign({ id }, jwtSecret, { expiresIn: "7d" });
};

const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    res.status(422).json({ errors: ["Por favor, utilize outro e-mail"] });
    return;
  }

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: passwordHash,
  });

  if (!newUser) {
    res.status(422).json({
      errors: ["Houve um erro ao fazer conta, tente novamente mais tarde"],
    });
    return;
  }

  res.status(201).json({
    _id: newUser._id,
    token: generateToken(newUser._id),
  });
};

const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(422).json({ errors: ["Usuário não encontrado"] });
    return;
  }

  if (!(await bcrypt.compare(password, user.password))) {
    res.status(422).json({ errors: ["Senha incorreta."] });
    return;
  }

  res.status(201).json({
    _id: user._id,
    token: generateToken(user._id),
  });
};

const getUserInfo = async (
  req: IGetUserAuthInfoRequest,
  res: Response
): Promise<void> => {
  const reqUser = req.user;

  const user = await User.findById(reqUser._id);
  if (!user) {
    res.status(404).json({ errors: ["Usuário não encontrado"] });
    return;
  }

  res.status(200).json({
    name: user.name,
    _id: user._id,
  });
};

module.exports = {
  register,
  login,
  getUserInfo,
};
