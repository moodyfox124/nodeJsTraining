import { createLogger, transports, format } from "winston";

const logger = createLogger({
  level: "info",

  transports: [
    new transports.Console({
      level: "info",
      format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.colorize(),
        format.printf(
          ({ level, timestamp, message }) =>
            `[${level}] ${timestamp}: ${message}`
        )
      ),
    }),
  ],
});

export { logger };
