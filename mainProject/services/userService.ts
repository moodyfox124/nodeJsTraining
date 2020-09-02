import { IUserRequestBody } from "../interfaces/user";
import { v4 } from "uuid";
import UserModel from "../models/user";
import { Op } from "sequelize";

class UserService {
  async getAutoSuggestUsers(login: string, limit: number) {
    const result = await UserModel.findAll({
      where: {
        is_deleted: false,
        login: {
          [Op.like]: `${login}%`,
        },
      },
      limit,
    });

    return result.sort((firstObj, secondObj) => {
      if (firstObj.login > secondObj.login) return 1;
      if (firstObj.login < secondObj.login) return -1;
      return 0;
    });
  }

  async createUser(userData: IUserRequestBody) {
    return UserModel.create({
      id: v4(),
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
