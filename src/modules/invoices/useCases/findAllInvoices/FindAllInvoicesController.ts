import { Request, Response } from "express";
import { FindAllInvoicesUseCase } from "./FindAllInvoicesUseCase";

export class FindAllInvoicesController {
  async handle(request: Request, Response: Response) {
    const id_user = request.id_user;

    const findAllInvoicesUseCase = new FindAllInvoicesUseCase();

    const invoices = await findAllInvoicesUseCase.execute(id_user);

    return Response.json(invoices);
  }
}
