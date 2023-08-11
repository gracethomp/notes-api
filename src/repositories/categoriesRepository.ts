import { Sequelize } from "sequelize";
import { initializeModels } from "../helpers/models";
import { getSequelizeModels } from "../helpers/db";


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