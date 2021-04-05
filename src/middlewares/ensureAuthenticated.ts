import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import AppError from "../errors/app-error";
import TypeORMUsersRepository from "../modules/accounts/repositories/implementations/users.repository";

interface AuthPayload {
  sub: string;
}

export async function ensureAutheticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    // todo: botar esse hash numa variável de ambiente
    const { sub: userId } = verify(
      token,
      "fefc042e77962980b1673089a4a8db31"
    ) as AuthPayload;

    // todo: encontrar outra forma de pegar esse repositório
    const usersRepository = new TypeORMUsersRepository();

    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new AppError("User not found", 401);
    }

    // todo: ver possibilidade de colocar o usuário em vez do id
    request.user = { id: userId };

    next();
  } catch {
    throw new AppError("Invalid token", 401);
  }
}
