import { logger } from "./loggerInstance";

const invokedMethodLogger = (target, key, descriptor) => {
  const value = descriptor.value;
  descriptor.value = function () {
    const args = JSON.stringify([...arguments]).replace(/^\[([\s\S]*)]$/, "$1");
    logger.info(
      `Invoking ${target.constructor.name}::${key}(${args})`
    );
    return value.apply(this, arguments);
  };
  return descriptor;
};

const errorLogger = (target, key, descriptor) => {
  const value = descriptor.value;
  descriptor.value = function () {
    try {
      return value.apply(this, arguments);
    } catch (err) {
      const args = JSON.stringify([...arguments]).replace(
        /^\[([\s\S]*)]$/,
        "$1"
      );
      logger.error(
        `Error occured in method ${target.constructor.name}::${key}(${args}), error message: ${err.message}`
      );
      throw err;
    }
  };
  return descriptor;
};

export { errorLogger, invokedMethodLogger };
