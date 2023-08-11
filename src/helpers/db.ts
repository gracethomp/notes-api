import { Sequelize } from "sequelize";
import { initializeModels } from "./models";

const DB_NAME = "yourdb";
const DB_USER = "youruser";
const DB_PASSWORD = "yourpassword";
const DB_HOST = "localhost";
const DB_PORT = 5432;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "postgres",
});

export async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

export function getSequelizeInstance() {
  return sequelize;
}

export function getSequelizeModels() {
  const {note, Category} = initializeModels(sequelize);
  return {
    note,
    Category,
  };
}
