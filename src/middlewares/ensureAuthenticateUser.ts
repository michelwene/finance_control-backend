import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticateUser(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({
      message: "Token missing",
    });
  }

  const [, token] = authToken.split(" ");

  const md5Hash = process.env.MD5_HASH;

  if (!md5Hash) {
    throw new Error("MD5_HASH não foi definido");
  }

  try {
    const { sub } = verify(token, md5Hash) as IPayload;
    request.id_user = sub;

    return next();
  } catch (err) {
    return response.status(401).json({
      message: "Invalid token",
    });
  }
}
