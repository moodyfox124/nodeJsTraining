import express from "express";
import userRoutes from "./routes/users";
import groupRouter from "./routes/groups";
import { logger } from "./utils/logger/loggerInstance";
import { requestLogger } from "./helpers/middlewares/requestLogger";
import { errorHandler } from "./helpers/middlewares/errorHandler";

process.on("uncaughtException", (err) => {
  logger.error(err.message);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  logger.error(err);
});

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(requestLogger);
app.use("/users", userRoutes);
app.use("/groups", groupRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
