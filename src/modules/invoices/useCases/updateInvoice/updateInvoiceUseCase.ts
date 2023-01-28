import { prisma } from "../../../../database/prismaClient";

interface IUpdateInvoiceUseCase {
  id: string;
  name: string;
  value: number;
  expire_at: Date;
  paid_at?: Date | null;
  status: "paid" | "pending";
}

export class UpdateInvoiceUseCase {
  async execute({
    expire_at,
    id,
    name,
    paid_at,
    status,
    value,
  }: IUpdateInvoiceUseCase) {
    const isExistingInvoice = await prisma.invoices.findUnique({
      where: {
        id,
      },
    });
    if (!isExistingInvoice) {
      throw new Error("Fatura não encontrada!");
    }

    const invoiceUpdated = await prisma.invoices.update({
      where: {
        id,
      },
      data: {
        name,
        value,
        expire_at,
        paid_at,
        status,
      },
      select: {
        id: true,
      },
    });

    return invoiceUpdated;
  }
}
