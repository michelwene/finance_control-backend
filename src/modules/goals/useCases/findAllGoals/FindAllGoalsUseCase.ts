import { prisma } from "../../../../database/prismaClient";

export class FindAllGoalsUseCase {
  async execute(id_user: string) {
    const goals = await prisma.goals.findMany({
      where: {
        id_user,
      },
      select: {
        id: true,
        name: true,
        description: true,
        total_value: true,
        deadline: true,
      },
    });

    return goals;
  }
}
