import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../database/prismaClient";

interface IAuthenticateUser {
  username: string;
  password: string;
}

export class AuthenticateUserUseCase {
  async execute({ password, username }: IAuthenticateUser) {
    const client = await prisma.users.findFirst({
      where: {
        username,
      },
    });

    if (!client) {
      throw new Error("Usuário não encontrado!");
    }

    const passwordMath = await compare(password, client.password);

    if (!passwordMath) {
      throw new Error("Senha incorreta!");
    }

    const md5Hash = process.env.MD5_HASH;
    if (!md5Hash) {
      throw new Error("MD5_HASH não foi definido");
    }

    const token = sign({ username }, md5Hash, {
      subject: client.id,
      expiresIn: "1d",
    });
    return token;
  }
}
