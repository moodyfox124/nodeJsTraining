import { GroupModel, UserModel } from "../../database/models/index";
import { sequelizeConnection } from "../../database/connection";

sequelizeConnection.sync({ force: true }).then(async () => {
  UserModel.bulkCreate([
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

  GroupModel.bulkCreate([
    {
      name: "test1",
      permissions: ["READ", "SHARE"],
    },
    {
      name: "test2",
      permissions: ["WRITE", "UPLOAD_FILES"],
    },
  ]);
});

