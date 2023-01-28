import { parse } from "date-fns";
import { Request, Response } from "express";
import { UpdateGoalUseCase } from "./updateGoalUseCase";

export class UpdateGoalController {
  async handle(request: Request, response: Response) {
    const { name, description, deadline, total_value } = request.body;
    const { id } = request.params;

    const updateGoalUseCase = new UpdateGoalUseCase();

    if (!id) {
      return response
        .status(400)
        .json({ message: "Id da meta é obrigatório!" });
    }

    if (!deadline || !name || !total_value) {
      return response.status(400).json({ message: "Dados inválidos!" });
    }

    const goalUpdated = await updateGoalUseCase.execute({
      id,
      name,
      description,
      deadline: parse(deadline, "dd/MM/yyyy", new Date()),
      total_value,
    });

    return response.json(goalUpdated);
  }
}
