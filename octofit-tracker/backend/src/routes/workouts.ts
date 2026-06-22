import { Workout } from "../models/Workout";
import { createCrudRouter } from "./createCrudRouter";

export const workoutsRouter = createCrudRouter(Workout);
