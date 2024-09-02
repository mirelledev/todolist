import { Schema, model, Types, Document } from "mongoose";

export interface ITask {
  title: string;
  userId?: Types.ObjectId;
}

const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    userId: { type: Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

const Task = model<ITask>("Task", taskSchema);
export default Task;
