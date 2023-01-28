import { parse } from "date-fns";
import { Request, Response } from "express";
import { UpdateInvoiceUseCase } from "./updateInvoiceUseCase";

export class UpdateInvoiceController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { name, value, expire_at, paid_at, status } = request.body;

    const updateInvoiceUseCase = new UpdateInvoiceUseCase();

    if (!id) {
      return response
        .status(400)
        .json({ message: "Id da fatura é obrigatório!" });
    }

    if (!value) {
      return response
        .status(400)
        .json({ message: "Valor da fatura é obrigatório!" });
    }

    if (!expire_at) {
      return response
        .status(400)
        .json({ message: "Data de vencimento é obrigatório!" });
    }

    const invoiceUpdated = await updateInvoiceUseCase.execute({
      id,
      name,
      value,
      expire_at: parse(expire_at, "dd/MM/yyyy", new Date()),
      paid_at: paid_at ? parse(paid_at, "dd/MM/yyyy", new Date()) : null,
      status,
    });

    return response.json(invoiceUpdated);
  }
}
