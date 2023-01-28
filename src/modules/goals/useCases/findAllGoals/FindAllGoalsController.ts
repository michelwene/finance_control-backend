import { Request, Response } from "express";
import { FindAllGoalsUseCase } from "./FindAllGoalsUseCase";

export class FindAllGoalsController {
  async handle(request: Request, response: Response) {
    const id_user = request.id_user;

    const findAllGoalsUseCase = new FindAllGoalsUseCase();

    const goals = await findAllGoalsUseCase.execute(id_user);

    return response.json(goals);
  }
}
