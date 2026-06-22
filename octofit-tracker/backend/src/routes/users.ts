import { User } from "../models/User";
import { createCrudRouter } from "./createCrudRouter";

export const usersRouter = createCrudRouter(User);
