import { CORS_ALLOWED_RESOURCES } from "./constants";

const corsOptionsDelegate = (req, callback) => {
  let corsOptions;
  if (CORS_ALLOWED_RESOURCES.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

export { corsOptionsDelegate };
