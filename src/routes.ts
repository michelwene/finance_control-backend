import { Router } from "express";
import { AuthenticateUserController } from "./modules/account/autheticateUser/AuthenticateUserController";
import { CreateUserController } from "./modules/users/useCases/createUser/CreateUserController";

const routes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

routes.post("/users", createUserController.handle);
routes.post("/users/auth", authenticateUserController.handle);

export { routes };
