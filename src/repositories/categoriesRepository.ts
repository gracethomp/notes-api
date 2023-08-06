import { Category } from "../helpers/Category";
import { getDatabase } from "../helpers/db";

export async function findAllCategories() {
  const database = getDatabase();
  const categories = database.collection<Category>("categories");
  const allCategories: Category[] = await categories.find({}).toArray();
  return allCategories;
}
