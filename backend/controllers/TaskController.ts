import User from "../models/User";
import Task from "../models/Task";
import mongoose from "mongoose";
import { Request, Response } from "express";
import { Types } from "mongoose";
import { IGetUserAuthInfoRequest } from "../@types/express";

const addTask = async (
  req: IGetUserAuthInfoRequest,
  res: Response
): Promise<void> => {
  const { title } = req.body;
  const reqUser = req.user;
  const user = await User.findById(reqUser!._id);

  if (!user) {
    res
      .status(422)
      .json({ errors: ["Houve um erro, tente novamente mais tarde"] });
    return;
  }

  const newTask = await Task.create({
    title,
    userId: user._id,
  });
  if (!newTask) {
    res.status(422).json({ errors: ["Houve um erro ao criar task"] });
    return;
  }

  res.status(200).json({
    message: "criou",
    newTask,
  });
};

const getUserTasks = async (req: IGetUserAuthInfoRequest, res: Response) => {
  const reqUser = req.user;
  const user = await User.findById(reqUser!._id);

  if (!user) {
    res
      .status(422)
      .json({ errors: ["Houve um erro, tente novamente mais tarde"] });
    return;
  }
  const tasks = await Task.find({ userId: user._id })
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(tasks);
};

const deleteTask = async (req: IGetUserAuthInfoRequest, res: Response) => {
  const { id } = req.params;
  const reqUser = req.user;
  const user = await User.findById(reqUser!._id);
  if (!user) {
    res
      .status(422)
      .json({ errors: ["Houve um erro, tente novamente mais tarde"] });
    return;
  }
  const task = await Task.findById(id);
  if (!task) {
    res.status(404).json({ errors: ["Tarefa não encontrada"] });
    return;
  }
  if (!task?.userId?.equals(user._id)) {
    res
      .status(422)
      .json({ errors: ["Ocorreu um erro, tente novamente mais tarde"] });
    return;
  }

  await Task.findByIdAndDelete(task._id);

  res
    .status(200)
    .json({ id: task._id, message: "Tarefa excluida com sucesso" });
};

const updateTask = async (req: IGetUserAuthInfoRequest, res: Response) => {
  const { id } = req.params;
  const { title } = req.body;

  const reqUser = req.user;

  const user = User.findById(reqUser._id);
  if (!user) {
    res
      .status(422)
      .json({ errors: ["Ocorreu um erro, tente novamente mais tarde."] });
    return;
  }

  const task = await Task.findById(id);
  if (!task) {
    res.status(404).json({ errors: ["Tarefa não encontrada."] });
    return;
  }

  if (!task.userId?.equals(reqUser._id)) {
    res.status(422).json({ errors: ["Ocorreu um erro."] });
    return;
  }

  if (title) {
    task.title = title;
  }
  await task.save();
  res.status(200).json({ task, message: "Tarefa atualizada com sucesso." });
};

module.exports = {
  addTask,
  getUserTasks,
  deleteTask,
  updateTask,
};
