"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const database_1 = require("./config/database");
const activities_1 = require("./routes/activities");
const leaderboard_1 = require("./routes/leaderboard");
const teams_1 = require("./routes/teams");
const users_1 = require("./routes/users");
const workouts_1 = require("./routes/workouts");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok", apiUrl: config_1.apiConfig.baseUrl });
});
app.use("/api/users", users_1.usersRouter);
app.use("/api/teams", teams_1.teamsRouter);
app.use("/api/activities", activities_1.activitiesRouter);
app.use("/api/leaderboard", leaderboard_1.leaderboardRouter);
app.use("/api/workouts", workouts_1.workoutsRouter);
app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
});
const startServer = async () => {
    try {
        await (0, database_1.connectDatabase)();
        console.log(`MongoDB connected at ${database_1.mongoUri}`);
        app.listen(config_1.apiConfig.port, () => {
            console.log(`Backend listening on ${config_1.apiConfig.baseUrl}`);
        });
    }
    catch (error) {
        console.error("Startup failure:", error);
        process.exit(1);
    }
};
void startServer();
