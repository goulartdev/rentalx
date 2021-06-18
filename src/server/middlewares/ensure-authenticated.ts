import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "@config/auth";
import TypeORMUsersTokensRepository from "@modules/accounts/externals/typeorm/repositories/users-tokens.repository";
import TypeORMUsersRepository from "@modules/accounts/externals/typeorm/repositories/users.repository";
import AppError from "@shared/errors/app-error";

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
    const { sub: userId } = verify(token, auth.refreshToken.secretHash) as AuthPayload;

    // todo: encontrar outra forma de pegar esse repositório
    const usersTokenRepository = new TypeORMUsersTokensRepository();
    const userToken = await usersTokenRepository.findByUserIdAndToken(userId, token);

    if (!userToken) {
      throw new AppError("Invalid token", 400);
    }

    // todo: encontrar outra forma de pegar esse repositório, ou traser o usuário junto com a query do userToken
    const userRepository = new TypeORMUsersRepository();
    const user = await userRepository.findById(userToken.id);

    if (!user) {
      throw new AppError("User not found", 401);
    }

    // todo: ver possibilidade de colocar o usuário em vez do id
    request.user = { id: userId, isAdmin: user.isAdmin };

    next();
  } catch {
    throw new AppError("Invalid token", 401);
  }
}
