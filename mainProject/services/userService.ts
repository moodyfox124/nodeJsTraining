import { IUserRequestBody } from "../helpers/interfaces/user";
import UserModel from "../database/models/user";
import { Op } from "sequelize";
import { errorLogger, invokedMethodLogger } from "../utils/logger/loggers";

class UserService {
  @invokedMethodLogger
  @errorLogger
  async getAutoSuggestUsers(login: string, limit: number) {
    return await UserModel.findAll({
      where: {
        is_deleted: false,
        login: {
          [Op.like]: `${login}%`,
        },
      },
      limit,
      order: ["login"],
    });
  }

  @invokedMethodLogger
  @errorLogger
  async createUser(userData: IUserRequestBody) {
    return UserModel.create({
      ...userData,
      is_deleted: false,
    });
  }

  @invokedMethodLogger
  @errorLogger
  async getUserById(id: string) {
    return UserModel.findOne({
      where: {
        id,
        is_deleted: false,
      },
    });
  }

  @invokedMethodLogger
  @errorLogger
  async updateUser(id: string, userData: IUserRequestBody) {
    return UserModel.update(
      {
        ...userData,
      },
      {
        where: {
          id,
          is_deleted: false,
        },
      }
    );
  }

  @invokedMethodLogger
  @errorLogger
  async deleteUser(id: string) {
    return UserModel.update(
      {
        is_deleted: true,
      },
      {
        where: {
          id,
          is_deleted: false,
        },
      }
    );
  }
}

export const userService = new UserService();
