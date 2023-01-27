import { prisma } from "../../../../database/prismaClient";

interface ICreateGoalUseCase {
  name: string;
  description: string;
  deadline: Date;
  total_value: number;
  id_user: string;
}

export class CreateGoalUseCase {
  async execute({
    deadline,
    description,
    name,
    total_value,
    id_user,
  }: ICreateGoalUseCase) {
    const goal = await prisma.goals.findFirst({
      where: {
        name: {
          equals: name,
          mode: "insensitive",
        },
      },
    });

    if (goal) {
      throw new Error("Esta meta já existe");
    }

    const newGoal = await prisma.goals.create({
      data: {
        name,
        description,
        deadline,
        total_value,
        id_user: id_user,
      },
      select: {
        id: true,
        name: true,
        deadline: true,
      },
    });

    return newGoal;
  }
}
