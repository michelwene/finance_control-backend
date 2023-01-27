import { Router } from "express";
import { ensureAuthenticateUser } from "./middlewares/ensureAuthenticateUser";
import { AuthenticateUserController } from "./modules/account/autheticateUser/AuthenticateUserController";
import { CreateGoalController } from "./modules/goals/useCases/createGoal/CreateGoalController";
import { CreateInvoiceController } from "./modules/invoices/useCases/createInvoice/CreateInvoiceController";
import { DeleteInvoiceController } from "./modules/invoices/useCases/deleteInvoice/DeleteInvoiceController";
import { CreateUserController } from "./modules/users/useCases/createUser/CreateUserController";

const routes = Router();

const createUserController = new CreateUserController();
const createGoalController = new CreateGoalController();
const createInvoiceController = new CreateInvoiceController();

const authenticateUserController = new AuthenticateUserController();

const deleteInvoiceController = new DeleteInvoiceController();

routes.post("/user", createUserController.handle);
routes.post("/goal", ensureAuthenticateUser, createGoalController.handle);
routes.post("/invoice", ensureAuthenticateUser, createInvoiceController.handle);

routes.post("/user/auth", authenticateUserController.handle);

routes.delete(
  "/invoice/:id",
  ensureAuthenticateUser,
  deleteInvoiceController.handle
);

export { routes };
