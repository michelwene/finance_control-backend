import { Request, Response } from "express";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

export class UpdateUserController {
  async handle(request: Request, response: Response) {
    const { email, password, username, phone } = request.body;
    const id_user = request.id_user;

    if (!email || !password || !username || !phone) {
      return response.status(400).json({
        message: "não foi encontrado algum dos parâmetros do usuário.",
      });
    }

    const updateUserUseCase = new UpdateUserUseCase();

    const userUpdated = await updateUserUseCase.execute({
      email,
      password,
      username,
      phone,
      id_user,
    });

    return response.status(200).json(userUpdated);
  }
}
