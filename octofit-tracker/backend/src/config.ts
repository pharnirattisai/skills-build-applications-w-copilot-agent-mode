import dotenv from "dotenv";

dotenv.config();

const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;

export const apiConfig = {
  port,
  baseUrl: codespaceName
    ? `https://${codespaceName}-${port}.app.github.dev`
    : `http://localhost:${port}`,
};
