import { Router, Request, Response, NextFunction } from "express";
import Logger from "../../logger/index";
import TaskService from "../services/TaskService";
import { validationResult } from "express-validator";
import { validateTask } from "../validators/taskValidator";

const route = Router();

export default (app: Router) => {
  app.use("/tasks", route);

  route.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tasks = await TaskService.getTasks();
      Logger.info("All tasks searched for");
      return res.status(200).json({ tasks });
    } catch (error) {
      Logger.error(`Task error ${error}`);
      return next(error);
    }
  });

  route.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await TaskService.getTask(req.params.id);
      Logger.info(`The tasks id searched for ${req.params.id}`);
      return res.status(200).json({ tasks: result });
    } catch (error) {
      Logger.error(`Task error ${error}`);
      return next(error);
    }
  });

  route.post(
    "/",
    validateTask(),
    async (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      try {
        const result = await TaskService.createTask(req);
        return res.status(200).json({ task: result });
      } catch (error) {
        Logger.error(`Task error ${error}`);
        return next(error);
      }
    }
  );

  route.patch(
    "/:id",
    validateTask(),
    async (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      try {
        const result = await TaskService.updateTask(req);
        return res.status(200).json({ task: result });
      } catch (error) {
        Logger.error(`Task error ${error}`);
        return next(error);
      }
    }
  );

  route.delete(
    "/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await TaskService.deleteTask(req.params.id);
        return res.status(201).json({ response: "success" });
      } catch (error) {
        Logger.error(`Task error ${error}`);
        return next(error);
      }
    }
  );
};
