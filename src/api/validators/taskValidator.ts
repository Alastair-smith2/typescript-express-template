import { body } from "express-validator";

export const validateTask = () => {
  return [
    body("title")
      .isLength({ min: 5 })
      .withMessage("Invalid title length, must be at least 5 character"),
    body("content")
      .isLength({ min: 5, max: 20 })
      .withMessage(
        "Invalid content length, must be between 5 and 20 characters"
      )
  ];
};
