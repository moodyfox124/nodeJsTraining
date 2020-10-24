import jwt from "jsonwebtoken";

const jwtVerification = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (token) {
    jwt.verify(token, process.env.AUTHENTICATION_SECRET, (err, decoded) => {
      err ? res.sendStatus(403) : next();
    });
  } else {
    res.sendStatus(401);
  }
};

export { jwtVerification };
