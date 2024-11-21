import db from "../../Database/index.js";

export const createUser = (user) => {
    const newUser = { ...user, _id: Date.now() };
    db.usersData = [...db.usersData, newUser];
    return newUser;
};

export const findAllUsers = () => db.usersData;

export const findUserById = (userId) => db.usersData.find((user) => user._id === userId);

export const findUserByUsername = (username) => db.usersData.find((user) => user.username === username);

export const findUserByCredentials = (username, password) =>
    db.usersData.find((user) => user.username === username && user.password === password);

export const updateUser = (userId, user) => {
    db.usersData = db.usersData.map((u) => (u._id === userId ? user : u));
};

export const deleteUser = (userId) => {
    db.usersData = db.usersData.filter((u) => u._id !== userId);
};