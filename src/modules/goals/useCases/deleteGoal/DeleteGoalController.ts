import { Request, Response } from "express";
import { DeleteGoalUseCase } from "./DeleteGoalUseCase";

export class DeleteGoalController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const deleteGoalUseCase = new DeleteGoalUseCase();

    await deleteGoalUseCase.execute(id);

    return response.status(204).send();
  }
}
