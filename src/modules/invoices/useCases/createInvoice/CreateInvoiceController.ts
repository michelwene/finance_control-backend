import { parse } from "date-fns";
import { Request, Response } from "express";
import { CreateInvoiceUseCase } from "./CreateInvoiceUseCase";

export class CreateInvoiceController {
  async handle(request: Request, response: Response) {
    const { name, value, expire_at } = request.body;
    const id_user = request.id_user;

    const createInvoiceUseCase = new CreateInvoiceUseCase();
    const result = await createInvoiceUseCase.execute({
      name,
      value,
      expire_at: parse(expire_at, "dd/MM/yyyy", new Date()),
      id_user,
    });

    return response.status(201).json(result);
  }
}
