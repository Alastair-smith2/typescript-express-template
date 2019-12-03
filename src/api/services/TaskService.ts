import { TaskInterface, TaskModel } from "../../models/tasks.type";
import { Request } from "express";
import Task from "../../models/tasks";

interface TaskServiceInterface {
  getTasks: () => Promise<TaskInterface[]>;
  createTask: (body: Request) => Promise<TaskInterface>;
}

class TaskService implements TaskServiceInterface {
  private taskModel: TaskModel;
  constructor(taskModel: TaskModel = Task) {
    this.taskModel = taskModel;
  }

  public getTasks = async (): Promise<TaskInterface[]> => {
    return this.taskModel.find();
  };

  public getTask = async (id: string): Promise<TaskInterface> => {
    return this.taskModel.findById(id);
  };

  public createTask = async (req: Request): Promise<TaskInterface> => {
    const { title, content } = req.body;
    const task = new Task({ title, content });
    await task.save();
    return task;
  };

  public updateTask = async (req: Request): Promise<TaskInterface> => {
    const { id } = req.params;
    const { title, content } = req.body;
    const existingTask = await this.taskModel.findById(id);
    existingTask.title = title;
    existingTask.content = content;
    await existingTask.save();
    return existingTask;
  };

  public deleteTask = async (id: string): Promise<void> => {
    await this.taskModel.findByIdAndDelete(id);
  };
}

export default new TaskService();
