import { prisma } from "../../../../database/prismaClient";

export class DeleteGoalUseCase {
  async execute(id: string) {
    const goal = await prisma.goals.findFirst({
      where: {
        id,
      },
    });

    if (!goal) {
      throw new Error("Meta não encontrada");
    }

    await prisma.goals.delete({
      where: {
        id,
      },
    });
  }
}
