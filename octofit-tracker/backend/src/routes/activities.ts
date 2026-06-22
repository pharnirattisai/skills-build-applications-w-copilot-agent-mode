import { Activity } from "../models/Activity";
import { createCrudRouter } from "./createCrudRouter";

export const activitiesRouter = createCrudRouter(Activity);
