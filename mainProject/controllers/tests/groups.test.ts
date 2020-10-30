import {
  createGroup,
  deleteGroup,
  getAllGroups,
  getGroupById,
  updateGroup,
} from "../groups";
import { groupService } from "../../services/groupService";
import { GroupModel } from "../../database/models";
import { generateRndInteger } from "../../helpers/random";

const ERROR_MESSAGE = "tested error";
const idParam = generateRndInteger(1);

let request = {
  body: {},
  params: { id: idParam },
};

let response = {
  send: jest.fn().mockReturnThis(),
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
};

describe("Group Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllGroups", () => {
    test("should return list of groups", async () => {
      const listOfGroups = (["test"] as unknown) as GroupModel[];
      jest
        .spyOn(groupService, "getAllGroups")
        .mockImplementation(() => Promise.resolve(listOfGroups));

      await getAllGroups(request, response);

      expect(response.send).toBeCalledTimes(1);
      expect(response.send).toHaveBeenCalledWith(listOfGroups);
    });

    test("should call res.status with Internal Server Error if groupService throw error and res.send with error message", async () => {
      jest
        .spyOn(groupService, "getAllGroups")
        .mockImplementation(() => Promise.reject(new Error(ERROR_MESSAGE)));

      await getAllGroups(request, response);

      expect(response.status).toBeCalledTimes(1);
      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.send).toBeCalledTimes(1);
      expect(response.send).toHaveBeenCalledWith(ERROR_MESSAGE);
    });
  });

  describe("createGroup", () => {
    test("should return message with created group id", async () => {
      const createdGroup = ({
        id: generateRndInteger(),
      } as unknown) as GroupModel;

      jest
        .spyOn(groupService, "createGroup")
        .mockImplementation(() => Promise.resolve(createdGroup));

      await createGroup(request, response);

      expect(response.send).toBeCalledTimes(1);
      expect(response.send).toHaveBeenCalledWith(
        `Group was created. Group received id: ${createdGroup.id}`
      );
    });

    test("should call res.status with Internal Server Error if groupService throw error and res.send with error message", async () => {
      jest
        .spyOn(groupService, "createGroup")
        .mockImplementation(() => Promise.reject(new Error(ERROR_MESSAGE)));

      await createGroup(request, response);

      expect(response.status).toBeCalledTimes(1);
      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.send).toBeCalledTimes(1);
      expect(response.send).toHaveBeenCalledWith(ERROR_MESSAGE);
    });
  });

  describe("getGroupById", () => {
    test("should return group with id from req.params.id if record was found", async () => {
      jest
        .spyOn(groupService, "getGroupById")
        .mockImplementation((id) =>
          Promise.resolve(({ id } as unknown) as GroupModel)
        );

      await getGroupById(request, response);

      expect(response.json).toBeCalledTimes(1);
      expect(response.json).toHaveBeenCalledWith({ id: idParam });
    });

    test("should call req.status with Not Found(404) if record wasn't found in db", async () => {
      jest
        .spyOn(groupService, "getGroupById")
        .mockImplementation(() =>
          Promise.resolve((null as unknown) as GroupModel)
        );

      await getGroupById(request, response);

      expect(response.status).toBeCalledTimes(1);
      expect(response.status).toHaveBeenCalledWith(404);
      expect(response.send).toBeCalledTimes(1);
      expect(response.send).toHaveBeenCalledWith(
        "There is no record in the Database with this ID."
      );
    });

    test("should call res.status with Internal Server Error if groupService throw error and res.send with error message", async () => {
      jest
        .spyOn(groupService, "getGroupById")
        .mockImplementation(() => Promise.reject(new Error(ERROR_MESSAGE)));

      await getGroupById(request, response);

      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.send).toHaveBeenCalledWith(ERROR_MESSAGE);
    });
  });

  describe("updateGroup", () => {
    test("should update record", async () => {
      jest
        .spyOn(groupService, "updateGroup")
        .mockImplementation((id) =>
          Promise.resolve(([id] as unknown) as [number, GroupModel[]])
        );

      await updateGroup(request, response);

      expect(response.send).toBeCalledTimes(1);
      expect(response.send).toHaveBeenCalledWith("Record updated.");
    });

    test("should call req.status with Not Found(404) if record wasn't found in db", async () => {
      jest
        .spyOn(groupService, "updateGroup")
        .mockImplementation(() =>
          Promise.resolve(([null] as unknown) as [number, GroupModel[]])
        );

      await updateGroup(request, response);

      expect(response.status).toBeCalledTimes(1);
      expect(response.status).toHaveBeenCalledWith(404);
      expect(response.send).toBeCalledTimes(1);
      expect(response.send).toHaveBeenCalledWith(
        "There is no record in the Database with this ID."
      );
    });

    test("should call res.status with Internal Server Error if groupService throw error and res.send with error message", async () => {
      jest
        .spyOn(groupService, "updateGroup")
        .mockImplementation(() => Promise.reject(new Error(ERROR_MESSAGE)));

      await updateGroup(request, response);

      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.send).toHaveBeenCalledWith(ERROR_MESSAGE);
    });
  });

  describe("deleteGroup", () => {
    test("should delete record", async () => {
      jest
        .spyOn(groupService, "deleteGroup")
        .mockImplementation(() => Promise.resolve(1));

      await deleteGroup(request, response);

      expect(response.send).toBeCalledTimes(1);
      expect(response.send).toHaveBeenCalledWith("Record deleted.");
    });

    test("should call req.status with Not Found(404) if record wasn't found in db", async () => {
      jest
        .spyOn(groupService, "deleteGroup")
        .mockImplementation(() => Promise.resolve(0));

      await deleteGroup(request, response);

      expect(response.status).toBeCalledTimes(1);
      expect(response.status).toHaveBeenCalledWith(404);
      expect(response.send).toBeCalledTimes(1);
      expect(response.send).toHaveBeenCalledWith(
        "There is no record in the Database with this ID."
      );
    });

    test("should call res.status with Internal Server Error if groupService throw error and res.send with error message", async () => {
      jest
        .spyOn(groupService, "deleteGroup")
        .mockImplementation(() => Promise.reject(new Error(ERROR_MESSAGE)));

      await deleteGroup(request, response);

      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.send).toHaveBeenCalledWith(ERROR_MESSAGE);
    });
  });
});
