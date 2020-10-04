import { logger } from "../../utils/logger/loggerInstance";

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);
  res.status(500).json({
    error: {
      message: `An unhandled error has occurred somewhere. Original error message: ${err.message}`,
    },
  });
  next();
};

export { errorHandler };
