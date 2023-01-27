import { prisma } from "../../../../database/prismaClient";

export class DeleteInvoiceUseCase {
  async execute(id: string) {
    const invoice = await prisma.invoices.findFirst({
      where: {
        id,
      },
    });

    if (!invoice) {
      throw new Error("Fatura não encontrada");
    }

    await prisma.invoices.delete({
      where: {
        id,
      },
    });
  }
}
