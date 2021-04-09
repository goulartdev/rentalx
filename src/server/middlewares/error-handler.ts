import { NextFunction, Request, Response } from "express";

import AppError from "@shared/errors/app-error";

function errorHandler(
  err: Error,
  request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): Response {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({ message: err.message });
  }

  return response
    .status(500)
    .json({ status: "Error", message: `Internal server error: ${err.message}` });
}

export default errorHandler;
