import dotenv from "dotenv";
dotenv.config({ path: "./mainProject/.env" });
import { Sequelize } from "sequelize";

const dbName = process.env.DBNAME;
const username = process.env.DBUSERNAME;
const password = process.env.PASSWORD;
const host = process.env.HOST;
const dialect = "postgres";

const sequelizeConnection = new Sequelize(dbName, username, password, {
  host,
  dialect,
});

export { sequelizeConnection };
