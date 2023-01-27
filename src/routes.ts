import { Router } from "express";
import { ensureAuthenticateUser } from "./middlewares/ensureAuthenticateUser";
import { AuthenticateUserController } from "./modules/account/autheticateUser/AuthenticateUserController";
import { CreateGoalController } from "./modules/goals/useCases/createGoal/CreateGoalController";
import { CreateUserController } from "./modules/users/useCases/createUser/CreateUserController";

const routes = Router();

const createUserController = new CreateUserController();
const createGoalController = new CreateGoalController();

const authenticateUserController = new AuthenticateUserController();

routes.post("/user", createUserController.handle);
routes.post("/goal", ensureAuthenticateUser, createGoalController.handle);

routes.post("/user/auth", authenticateUserController.handle);

export { routes };
