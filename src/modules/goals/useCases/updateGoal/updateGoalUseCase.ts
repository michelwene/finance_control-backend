import { prisma } from "../../../../database/prismaClient";

interface IUpdateGoalUseCase {
  id: string;
  name: string;
  description: string;
  deadline: Date;
  total_value: number;
}

export class UpdateGoalUseCase {
  async execute({
    id,
    name,
    description,
    deadline,
    total_value,
  }: IUpdateGoalUseCase) {
    const isExistingGoal = await prisma.goals.findUnique({
      where: {
        id,
      },
    });

    if (!isExistingGoal) {
      throw new Error("Meta não encontrada!");
    }

    const updatedGoal = await prisma.goals.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        deadline,
        total_value,
      },
      select: {
        id: true,
      },
    });

    return updatedGoal;
  }
}
