import { NextFunction, Request, Response } from "express";

const errorHandler = (
  error: Error,
  _: Request,
  response: Response,
  next: NextFunction,
): void => {
//   response.status(500).json({ message: error.message });
next(error)
};

export default errorHandler;
