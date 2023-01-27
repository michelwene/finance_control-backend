import { Request, Response } from "express";
import { DeleteInvoiceUseCase } from "./DeleteInvoiceUseCase";

export class DeleteInvoiceController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const deleteInvoiceUseCase = new DeleteInvoiceUseCase();

    await deleteInvoiceUseCase.execute(id);

    return response.status(204).send();
  }
}
