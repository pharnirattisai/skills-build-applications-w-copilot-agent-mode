"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 8000;
const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/octofit_tracker";
app.use(express_1.default.json());
app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
});
const startServer = async () => {
    try {
        await mongoose_1.default.connect(mongoUri);
        console.log(`MongoDB connected at ${mongoUri}`);
        app.listen(port, () => {
            console.log(`Backend listening on http://localhost:${port}`);
        });
    }
    catch (error) {
        console.error("Startup failure:", error);
        process.exit(1);
    }
};
void startServer();
