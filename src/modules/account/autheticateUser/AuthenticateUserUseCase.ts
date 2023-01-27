import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../database/prismaClient";

interface IAuthenticateUser {
  email: string;
  password: string;
}

export class AuthenticateUserUseCase {
  async execute({ password, email }: IAuthenticateUser) {
    const client = await prisma.users.findFirst({
      where: {
        email,
      },
    });

    if (!client) {
      throw new Error("Usuário com este email não existe");
    }

    const passwordMath = await compare(password, client.password);

    if (!passwordMath) {
      throw new Error("Senha incorreta!");
    }

    const token = sign({ email }, "e87dc0aa180c34b3f273b334b32c18a3", {
      subject: client.id,
      expiresIn: "1d",
    });
    return token;
  }
}
