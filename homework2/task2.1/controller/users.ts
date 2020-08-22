import { User } from '../models/user';
import { isAvailableProperty } from '../utils/sort';
import { v4 } from 'uuid';

const localStorage: Array<User> = [
    {
        id: v4(),
        login: 'some',
        password: 'pass',
        age: 11,
        isDeleted: false
    }
];

const getAutoSuggestUsers = (
    loginSubstring: string,
    limit: number
): Array<User> | [] => {
    const availableRecords = localStorage
        .filter((obj) => !obj.isDeleted)
        .sort((firstObj, secondObj) => {
            if (firstObj.login > secondObj.login) return 1;
            if (firstObj.login < secondObj.login) return -1;
            return 0;
        });
    const result = [];
    for (let i = 0; i < availableRecords.length; i++) {
        if (result.length === limit) {
            break;
        }
        if (availableRecords[i].login.includes(loginSubstring)) {
            result.push(availableRecords[i]);
        }
    }

    return result;
};

const getUser = (req, res) => {
    const query = req.query;
    if (
        !query.limit ||
    !Number.isInteger(Number(query.limit)) ||
    Number(query.limit) < 0
    ) {
        return res.send('Property limit should be Integer and not less than 0.');
    }
    if (!query.login) {
        return res.send('Property login should be in the query and have a value.');
    }
    const responseData = getAutoSuggestUsers(
        String(query.login),
        Number(query.limit)
    );
    res.json(responseData);
};

const createUser = (req, res) => {
    const user = req.body;
    const dataKeys = Object.keys(user);
    if (!dataKeys.length || isAvailableProperty(dataKeys)) {
        return res.send('Incorrect request data.');
    }
    const userId = v4();
    const userWithId: User = {
        id: userId,
        ...user,
        isDeleted: false
    };
    localStorage.push(userWithId);

    res.send(`User with login ${userWithId.login} was added to the Database.`);
};

const getUserById = (req, res) => {
    const { id } = req.params;
    const user = localStorage.find((obj) => obj.id === id && !obj.isDeleted);
    if (!user) {
        return res.send('There is no record in the Database with this ID.');
    }
    res.json(user);
};

const updateUser = (req, res) => {
    const data = req.body;
    const dataKeys = Object.keys(data);
    const { id } = req.params;
    try {
        if (!dataKeys.length || isAvailableProperty(dataKeys)) {
            return res.status(400).send('Incorrect request data.');
        }
        const user = localStorage.find((obj) => obj.id === id && !obj.isDeleted);
        if (!user) {
            return res.send('There is no record in the Database with this ID.');
        }
        dataKeys.forEach((key) => {
            user[key] = data[key];
        });
        res.send('Record updated');
    } catch (err) {
        res.status(400).send('Update failed.');
    }
};

const deleteUser = (req, res) => {
    const { id } = req.params;
    try {
        const user = localStorage.find((obj) => obj.id === id && !obj.isDeleted);
        if (!user) {
            return res.send('There is no record in the Database with this ID.');
        }
        user.isDeleted = true;
        res.send('Record deleted');
    } catch (err) {
        res.status(400).send('Delete failed.');
    }
};

export { getUser, createUser, getUserById, updateUser, deleteUser };
