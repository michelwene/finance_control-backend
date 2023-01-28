import { prisma } from "../../../../database/prismaClient";

export class FindAllInvoicesUseCase {
  async execute(id_user: string) {
    const invoices = await prisma.invoices.findMany({
      where: {
        id_user,
      },
      select: {
        id: true,
        value: true,
        name: true,
        expire_at: true,
        paid_at: true,
        status: true,
      },
    });

    return invoices;
  }
}
