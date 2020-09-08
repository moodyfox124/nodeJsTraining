import UserModel from "../../models/user";

UserModel.sync().then(async () => {
  await UserModel.bulkCreate([
    {
      login: "albert",
      password: "gt123f",
      age: 12,
    },
    {
      login: "antonio",
      password: "sd41qw",
      age: 4,
    },
    {
      login: "daniel123",
      password: "fgh435j",
      age: 50,
    },
  ]);
});
