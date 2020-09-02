import { Sequelize } from "sequelize";

const dbName = "mainProject";
const username = "postgres";
const password = "1234";
const host = "localhost";
const dialect = "postgres";

const sequelizeConnection = new Sequelize(dbName, username, password, {
  host,
  dialect,
});

export { sequelizeConnection };
