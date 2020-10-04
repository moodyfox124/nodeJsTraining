import { logger } from "../../utils/logger/loggerInstance";

const requestLogger = (req, res, next) => {
  const start = process.hrtime();
  res.on("finish", () => {
    const diff = process.hrtime(start);
    logger.info(
      `${req.method} ${req.originalUrl} took ${
        (diff[0] * 1e6 + diff[1]) / 1e6
      } ms`
    );
  });
  next();
};

export { requestLogger };
