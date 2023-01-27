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

  try {
    const { sub } = verify(
      token,
      "e87dc0aa180c34b3f273b334b32c18a3"
    ) as IPayload;

    request.id_user = sub;
  } catch (err) {
    return response.status(401).json({
      message: "Invalid token",
    });
  }
}
