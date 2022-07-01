import { Request, Response } from "express";

const errorHandler = (error: Error, _: Request, response: Response): void => {
  response.status(500).json({ message: error.message });
};

export { errorHandler };
