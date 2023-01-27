import { Request, Response } from "express";
import { CreateGoalUseCase } from "./CreateGoalUseCase";
import { parse } from "date-fns";

export class CreateGoalController {
  async handle(request: Request, response: Response) {
    const { name, description, deadline, total_value } = request.body;
    const id_user = request.id_user;

    const createGoalUseCase = new CreateGoalUseCase();
    const goal = await createGoalUseCase.execute({
      name,
      deadline: parse(deadline, "dd/MM/yyyy", new Date()),
      description,
      id_user,
      total_value,
    });

    return response.status(201).json(goal);
  }
}
