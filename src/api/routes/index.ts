import { Router } from "express";
import Tasks from "../controllers/tasks";
export default () => {
  const app = Router();
  Tasks(app);
  return app;
};
