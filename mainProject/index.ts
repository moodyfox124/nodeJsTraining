import express from "express";
import userRoutes from "./routes/users";
import groupRouter from "./routes/groups";
import authenticationRouter from "./routes/authentication";
import { logger } from "./utils/logger/loggerInstance";
import { requestLogger } from "./helpers/middlewares/requestLogger";
import { errorHandler } from "./helpers/middlewares/errorHandler";
import { jwtVerification } from "./helpers/middlewares/jwtVerifivation";
import cors from "cors";
import { corsOptionsDelegate } from "./helpers/cors";
const PORT = process.env.PORT || 3000;

process.on("uncaughtException", (err) => {
  logger.error(err.message);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  logger.error(err);
  process.exit(1);
});

const app = express();
app.disable("x-powered-by");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(cors(corsOptionsDelegate));

app.use("/authentication", authenticationRouter);

app.use(jwtVerification);

app.use("/users", userRoutes);
app.use("/groups", groupRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
