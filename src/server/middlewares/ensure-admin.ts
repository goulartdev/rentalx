import { NextFunction, Request, Response } from "express";

import AppError from "@shared/errors/app-error";

import { ensureAutheticated } from "./ensure-authenticated";

async function ensureIsAdmin(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const { isAdmin } = request.user;

  if (!isAdmin) {
    throw new AppError("User isn't admin", 401);
  }

  next();
}

export default [ensureAutheticated, ensureIsAdmin];
