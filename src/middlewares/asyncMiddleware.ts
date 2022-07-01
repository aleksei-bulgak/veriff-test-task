import { Request, Response, NextFunction, RequestHandler } from "express";

const asyncMiddleware =
  (fn: RequestHandler) =>
  (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };

export { asyncMiddleware };
