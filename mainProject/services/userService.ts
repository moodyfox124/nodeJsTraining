import { IUserRequestBody } from "../interfaces/user";
import UserModel from "../models/user";
import { Op } from "sequelize";

class UserService {
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

  async createUser(userData: IUserRequestBody) {
    return UserModel.create({
      ...userData,
      is_deleted: false,
    });
  }

  async getUserById(id: string) {
    return UserModel.findOne({
      where: {
        id,
        is_deleted: false,
      },
    });
  }

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
