import { userService } from "../services/userService";

const getUsers = async (req, res) => {
  const query = req.query;
  if (
    !query.limit ||
    !Number.isInteger(Number(query.limit)) ||
    Number(query.limit) < 0
  ) {
    return res
      .status(400)
      .send("Property limit should be Integer and not less than 0.");
  }
  if (!query.login) {
    return res
      .status(400)
      .send("Property login should be in the query and have a value.");
  }
  const responseData = await userService.getAutoSuggestUsers(
    String(query.login),
    Number(query.limit)
  );
  res.json(responseData);
};

const createUser = async (req, res) => {
  const user = req.body;

  const data = await userService.createUser(user);

  res.send(`User with login ${data.login} was added to the Database.`);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);

  if (!user) {
    return res.send("There is no record in the Database with this ID.");
  }

  res.json(user);
};

const updateUser = async (req, res) => {
  const data = req.body;
  const { id } = req.params;

  try {
    const user = await userService.updateUser(id, data);
    if (!user[0]) {
      throw new Error("Update failed.");
    }

    res.send("Record updated.");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userService.deleteUser(id);
    if (!user[0]) {
      throw new Error("Delete failed.");
    }

    res.send("Record deleted.");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export { getUsers, createUser, getUserById, updateUser, deleteUser };
