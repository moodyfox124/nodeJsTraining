import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../users";
import { userService } from "../../services/userService";
import { generateRndInteger } from "../../helpers/random";
import { UserModel } from "../../database/models";

const ERROR_MESSAGE = "tested error";
const idParam = generateRndInteger(1);

let request = {
  body: {},
  params: { id: idParam },
  query: {
    login: "test login",
    limit: generateRndInteger(1),
  },
};

let response = {
  send: jest.fn().mockReturnThis(),
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
};

describe("User Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getUsers", () => {
    test("should return list of users", async () => {
      const listOfUsers = (["test"] as unknown) as UserModel[];
      jest
        .spyOn(userService, "getAutoSuggestUsers")
        .mockImplementation(() => Promise.resolve(listOfUsers));

      await getUsers(request, response);

      expect(response.json).toBeCalledTimes(1);
      expect(response.json).toHaveBeenCalledWith(listOfUsers);
    });

    test("should call res.status with Internal Server Error if userService throw error and res.send with error message", async () => {
      jest
        .spyOn(userService, "getAutoSuggestUsers")
        .mockImplementation(() => Promise.reject(new Error(ERROR_MESSAGE)));

      await getUsers(request, response);

      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.send).toHaveBeenCalledWith(ERROR_MESSAGE);
    });
  });

  describe("createUser", () => {
    test("should return message with created user id", async () => {
      const createdUser = ({
        id: generateRndInteger(),
      } as unknown) as UserModel;

      jest
        .spyOn(userService, "createUser")
        .mockImplementation(() => Promise.resolve(createdUser));

      await createUser(request, response);

      expect(response.send).toBeCalledTimes(1);
      expect(response.send).toHaveBeenCalledWith(
        `User was created. User received id: ${createdUser.id}`
      );
    });

    test("should call res.status with Internal Server Error if userService throw error and res.send with error message", async () => {
      jest
        .spyOn(userService, "createUser")
        .mockImplementation(() => Promise.reject(new Error(ERROR_MESSAGE)));

      await createUser(request, response);

      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.send).toHaveBeenCalledWith(ERROR_MESSAGE);
    });
  });

  describe("getUserById", () => {
    test("should return user with id from req.params.id if record was found", async () => {
      jest
        .spyOn(userService, "getUserById")
        .mockImplementation((id) =>
          Promise.resolve(({ id } as unknown) as UserModel)
        );

      await getUserById(request, response);

      expect(response.json).toBeCalledTimes(1);
      expect(response.json).toHaveBeenCalledWith({ id: idParam });
    });

    test("should call req.status with Not Found(404) if record wasn't found in db", async () => {
      jest
        .spyOn(userService, "getUserById")
        .mockImplementation(() =>
          Promise.resolve((null as unknown) as UserModel)
        );

      await getUserById(request, response);

      expect(response.status).toBeCalledTimes(1);
      expect(response.status).toHaveBeenCalledWith(404);
      expect(response.send).toBeCalledTimes(1);
      expect(response.send).toHaveBeenCalledWith(
        "There is no record in the Database with this ID."
      );
    });

    test("should call res.status with Internal Server Error if userService throw error and res.send with error message", async () => {
      jest
        .spyOn(userService, "getUserById")
        .mockImplementation(() => Promise.reject(new Error(ERROR_MESSAGE)));

      await getUserById(request, response);

      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.send).toHaveBeenCalledWith(ERROR_MESSAGE);
    });
  });

  describe("updateUser", () => {
    test("should return user with id from req.params.id if record was found", async () => {
      jest
        .spyOn(userService, "updateUser")
        .mockImplementation((id) =>
          Promise.resolve(([id] as unknown) as [number, UserModel[]])
        );

      await updateUser(request, response);

      expect(response.send).toBeCalledTimes(1);
      expect(response.send).toHaveBeenCalledWith("Record updated.");
    });

    test("should call req.status with Not Found(404) if record wasn't found in db", async () => {
      jest
        .spyOn(userService, "updateUser")
        .mockImplementation(() =>
          Promise.resolve(([null] as unknown) as [number, UserModel[]])
        );

      await updateUser(request, response);

      expect(response.status).toBeCalledTimes(1);
      expect(response.status).toHaveBeenCalledWith(404);
      expect(response.send).toBeCalledTimes(1);
      expect(response.send).toHaveBeenCalledWith(
        "There is no record in the Database with this ID."
      );
    });

    test("should call res.status with Internal Server Error if userService throw error and res.send with error message", async () => {
      jest
        .spyOn(userService, "updateUser")
        .mockImplementation(() => Promise.reject(new Error(ERROR_MESSAGE)));

      await updateUser(request, response);

      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.send).toHaveBeenCalledWith(ERROR_MESSAGE);
    });
  });

  describe("deleteUser", () => {
    test("should delete record", async () => {
      jest
        .spyOn(userService, "deleteUser")
        .mockImplementation((id) => Promise.resolve(([id] as unknown) as [number, UserModel[]]));

      await deleteUser(request, response);

      expect(response.send).toBeCalledTimes(1);
      expect(response.send).toHaveBeenCalledWith("Record deleted.");
    });

    test("should call req.status with Not Found(404) if record wasn't found in db", async () => {
      jest
        .spyOn(userService, "deleteUser")
        .mockImplementation(() => Promise.resolve(([null] as unknown) as [number, UserModel[]]));

      await deleteUser(request, response);

      expect(response.status).toBeCalledTimes(1);
      expect(response.status).toHaveBeenCalledWith(404);
      expect(response.send).toBeCalledTimes(1);
      expect(response.send).toHaveBeenCalledWith(
        "There is no record in the Database with this ID."
      );
    });

    test("should call res.status with Internal Server Error if userService throw error and res.send with error message", async () => {
      jest
        .spyOn(userService, "deleteUser")
        .mockImplementation(() => Promise.reject(new Error(ERROR_MESSAGE)));

      await deleteUser(request, response);

      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.send).toHaveBeenCalledWith(ERROR_MESSAGE);
    });
  });
});
