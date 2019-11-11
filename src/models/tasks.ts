import Mongoose from "mongoose";
import { TaskInterface } from "./tasks.type";

export const TaskSchema = new Mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }
});

const Task = Mongoose.model<TaskInterface>("Task", TaskSchema);
export default Task;
