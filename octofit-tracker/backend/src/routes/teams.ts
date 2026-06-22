import { Team } from "../models/Team";
import { createCrudRouter } from "./createCrudRouter";

export const teamsRouter = createCrudRouter(Team);
