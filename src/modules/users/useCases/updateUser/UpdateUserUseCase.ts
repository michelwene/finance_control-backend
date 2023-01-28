import { hash } from "bcrypt";
import { prisma } from "../../../../database/prismaClient";

interface IUpdateUserUseCase {
  username: string;
  email: string;
  password: string;
  phone: string;
  id_user: string;
}

export class UpdateUserUseCase {
  async execute({
    email,
    password,
    phone,
    username,
    id_user,
  }: IUpdateUserUseCase) {
    const passwordHash = await hash(password, 10);
    const userUpdated = await prisma.users.update({
      where: {
        id: id_user,
      },
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

    return userUpdated;
  }
}
