import { logger } from "./loggerInstance";

const errorLogger = (target, key, descriptor) => {
  const value = descriptor.value;
  descriptor.value = function () {
    try {
      return value.apply(null, arguments);
    } catch (err) {
      const args = JSON.stringify([...arguments]).replace(
        /^\[([\s\S]*)]$/,
        "$1"
      );
      logger.error(
        `Error occured in method ${target.constructor.name}::${key}(${args}), error message: ${err.message}`
      );
    }
  };
  return descriptor;
};

export { errorLogger };
