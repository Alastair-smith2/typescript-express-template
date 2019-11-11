import Mongoose from "mongoose";

export interface TaskInterface extends Mongoose.Document {
  title: string;
  content: string;
}

export type TaskModel = Mongoose.Model<TaskInterface>;
