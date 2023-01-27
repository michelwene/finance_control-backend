import { prisma } from "../../../../database/prismaClient";

interface ICreateInvoiceUseCase {
  name: string;
  value: number;
  expire_at: Date;
  id_user: string;
}

export class CreateInvoiceUseCase {
  async execute({ expire_at, name, value, id_user }: ICreateInvoiceUseCase) {
    const invoice = await prisma.invoices.findFirst({
      where: {
        name: {
          equals: name,
          mode: "insensitive",
        },
      },
    });

    if (invoice) {
      throw new Error("Fatura com este nome já existe");
    }

    const newInvoice = await prisma.invoices.create({
      data: {
        name,
        value,
        expire_at,
        id_user,
      },
    });

    return newInvoice;
  }
}
