import { userService } from "../services/userService";
import jwt from "jsonwebtoken";
import { v4 } from "uuid";
import {
  AUTHENTICATION_EXPIRATION_TIME,
  REFRESH_TOKENS,
} from "../helpers/constants";

const jwtAuthentication = async (req, res) => {
  const userData = req.body;
  const user = await userService.getUser(userData.login, userData.password);
  if (!user) {
    return res.status(403).send({
      success: false,
      message: "Bad username/password combination.",
    });
  } else {
    const token = jwt.sign(
      { sub: user.id },
      process.env.AUTHENTICATION_SECRET,
      {
        expiresIn: AUTHENTICATION_EXPIRATION_TIME,
      }
    );
    const refreshToken = v4();
    REFRESH_TOKENS[user.id] = refreshToken;
    res.send({
      token: token,
      refresh_token: refreshToken,
      id: user.id,
    });
  }
};

const refreshTokenAuthentication = async (req, res) => {
  const refreshToken = req.body.refresh_token;
  const id = req.body.id;
  if (REFRESH_TOKENS[id] && REFRESH_TOKENS[id] === refreshToken) {
    const token = jwt.sign({ sub: id }, process.env.AUTHENTICATION_SECRET, {
      expiresIn: AUTHENTICATION_EXPIRATION_TIME,
    });
    const refreshToken = v4();
    REFRESH_TOKENS[id] = refreshToken;
    res.send({
      token: token,
      refresh_token: refreshToken,
      id: id,
    });
  } else {
    return res.status(403).send({
      success: false,
      message: "Bad refresh_token/id combination",
    });
  }
};

const refreshTokenReject = async (req, res) => {
  const id = req.body.id;
  if (REFRESH_TOKENS[id]) {
    delete REFRESH_TOKENS[id];
    res.status(200).send({
      removed: true,
      message: "Refresh token is removed",
    });
  } else {
    res.status(404).send({
      removed: false,
      message: "Refresh token is absent",
    });
  }
};

export { jwtAuthentication, refreshTokenAuthentication, refreshTokenReject };
