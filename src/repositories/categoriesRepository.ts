import { Sequelize } from "sequelize";
import { initializeModels } from "../helpers/models";

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

export function getSequelizeModels() {
  const { note, Category } = initializeModels(sequelize);
  return {
    note,
    Category,
  };
}

export async function findAllCategories() {
  const { Category } = getSequelizeModels();
  try {
    const allCategories = await Category.findAll({
      attributes: ["id", "name"],
    });
    return allCategories;
  } catch (error) {
    console.error("Error while fetching categories:", error);
    return [];
  }
}

export async function findByID(id:number) {
    const { Category } = getSequelizeModels();
    try {
      const neededNote = await Category.findByPk(id, {
        attributes: ["name"]
      });
      return neededNote;
    } catch (error) {
      throw new Error("Error while fetching");
    }
}