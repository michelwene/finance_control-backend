import { hash } from "bcrypt";
import { prisma } from "../../../../database/prismaClient";

interface ICreateUserUseCase {
  username: string;
  email: string;
  password: string;
  phone: string;
}

export class CreateUserUseCase {
  async execute({ email, password, phone, username }: ICreateUserUseCase) {
    const userAlreadyExists = await prisma.users.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
    });
    if (userAlreadyExists) {
      throw new Error("Já existe um usuário com este e-mail!");
    }
    const passwordHash = await hash(password, 10);
    const user = await prisma.users.create({
      data: {
        username,
        email,
        password: passwordHash,
        phone,
      },
      select: {
        id: true,
      },
    });
    return user;
  }
}
