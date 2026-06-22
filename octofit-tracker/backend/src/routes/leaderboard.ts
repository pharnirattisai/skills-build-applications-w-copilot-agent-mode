import { LeaderboardEntry } from "../models/LeaderboardEntry";
import { createCrudRouter } from "./createCrudRouter";

export const leaderboardRouter = createCrudRouter(LeaderboardEntry);
