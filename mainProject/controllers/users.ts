import { userService } from "../services/userService";

const getUsers = async (req, res) => {
  const query = req.query;
  try {
    const responseData = await userService.getAutoSuggestUsers(
      String(query.login),
      Number(query.limit)
    );

    res.json(responseData);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const createUser = async (req, res) => {
  const user = req.body;
  try {
    const data = await userService.createUser(user);

    res.send(`User was created. User received id: ${data.id}`);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userService.getUserById(id);

    if (!user) {
      return res
        .status(404)
        .send("There is no record in the Database with this ID.");
    }

    res.json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const updateUser = async (req, res) => {
  const data = req.body;
  const { id } = req.params;

  try {
    const user = await userService.updateUser(id, data);
    if (!user[0]) {
      return res
        .status(404)
        .send("There is no record in the Database with this ID.");
    }

    res.send("Record updated.");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userService.deleteUser(id);
    if (!user[0]) {
      return res
        .status(404)
        .send("There is no record in the Database with this ID.");
    }

    res.send("Record deleted.");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export { getUsers, createUser, getUserById, updateUser, deleteUser };
