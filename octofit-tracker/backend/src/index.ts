import cors from "cors";
import express from "express";
import { apiConfig } from "./config";
import { connectDatabase, mongoUri } from "./database";
import { activitiesRouter } from "./routes/activities";
import { leaderboardRouter } from "./routes/leaderboard";
import { teamsRouter } from "./routes/teams";
import { usersRouter } from "./routes/users";
import { workoutsRouter } from "./routes/workouts";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok", apiUrl: apiConfig.baseUrl });
});

app.use("/api/users", usersRouter);
app.use("/api/teams", teamsRouter);
app.use("/api/activities", activitiesRouter);
app.use("/api/leaderboard", leaderboardRouter);
app.use("/api/workouts", workoutsRouter);

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

const startServer = async () => {
  try {
    await connectDatabase();
    console.log(`MongoDB connected at ${mongoUri}`);

    app.listen(apiConfig.port, () => {
      console.log(`Backend listening on ${apiConfig.baseUrl}`);
    });
  } catch (error) {
    console.error("Startup failure:", error);
    process.exit(1);
  }
};

void startServer();
