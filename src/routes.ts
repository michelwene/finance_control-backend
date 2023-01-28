import { Router } from "express";
import { ensureAuthenticateUser } from "./middlewares/ensureAuthenticateUser";
import { AuthenticateUserController } from "./modules/account/autheticateUser/AuthenticateUserController";
import { CreateGoalController } from "./modules/goals/useCases/createGoal/CreateGoalController";
import { DeleteGoalController } from "./modules/goals/useCases/deleteGoal/DeleteGoalController";
import { FindAllGoalsController } from "./modules/goals/useCases/findAllGoals/FindAllGoalsController";
import { UpdateGoalController } from "./modules/goals/useCases/updateGoal/updateGoalController";
import { CreateInvoiceController } from "./modules/invoices/useCases/createInvoice/CreateInvoiceController";
import { DeleteInvoiceController } from "./modules/invoices/useCases/deleteInvoice/DeleteInvoiceController";
import { FindAllInvoicesController } from "./modules/invoices/useCases/findAllInvoices/FindAllInvoicesController";
import { UpdateInvoiceController } from "./modules/invoices/useCases/updateInvoice/updateInvoiceController";
import { CreateUserController } from "./modules/users/useCases/createUser/CreateUserController";
import { UpdateUserController } from "./modules/users/useCases/updateUser/UpdateUserController";

const routes = Router();

const createUserController = new CreateUserController();
const createGoalController = new CreateGoalController();
const createInvoiceController = new CreateInvoiceController();

const authenticateUserController = new AuthenticateUserController();

const deleteInvoiceController = new DeleteInvoiceController();
const deleteGoalController = new DeleteGoalController();

const findlAllGoalsController = new FindAllGoalsController();
const findlAllInvoicesController = new FindAllInvoicesController();

const updateUserController = new UpdateUserController();
const updateInvoiceController = new UpdateInvoiceController();
const updateGoalController = new UpdateGoalController();

routes.post("/user", createUserController.handle);
routes.post("/goal", ensureAuthenticateUser, createGoalController.handle);
routes.post("/invoice", ensureAuthenticateUser, createInvoiceController.handle);

routes.post("/user/auth", authenticateUserController.handle);

routes.delete(
  "/invoice/:id",
  ensureAuthenticateUser,
  deleteInvoiceController.handle
);

routes.delete("/goal/:id", ensureAuthenticateUser, deleteGoalController.handle);

routes.get("/goals", ensureAuthenticateUser, findlAllGoalsController.handle);
routes.get(
  "/invoices",
  ensureAuthenticateUser,
  findlAllInvoicesController.handle
);

routes.put("/user", ensureAuthenticateUser, updateUserController.handle);
routes.put(
  "/invoice/:id",
  ensureAuthenticateUser,
  updateInvoiceController.handle
);
routes.put("/goal/:id", ensureAuthenticateUser, updateGoalController.handle);

export { routes };
