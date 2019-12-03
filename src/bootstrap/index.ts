require("dotenv").config();
import { Express, Request, Response, NextFunction } from "express";
import compression from "compression"; // compresses requests
import bodyParser from "body-parser";
import lusca from "lusca";

import api from "../api/routes";
import CustomError from "../errors/Custom404";
import { startDatabase } from "../db/database";

// Create Express server
export const defaultErrorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log({ err }, "the error");
  console.log("I return here?");
  return res.status(err.status || 500).json({
    errors: {
      message: err.message
    }
  });
};

export const bootStrap = (app: Express) => {
  // Express configuration
  app.set("port", process.env.PORT || 3000);
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(lusca.xframe("SAMEORIGIN"));
  app.use(lusca.xssProtection(true));
  app.use("/api", api());
  app.use((req, res, next) => {
    const err = new CustomError("Route not found :(", 404);
    next(err);
  });

  app.use(defaultErrorHandler);

  startDatabase();
  return app;
};
