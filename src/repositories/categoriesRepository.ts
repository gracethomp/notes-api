import { MongoClient, ObjectId } from "mongodb";
import { Category } from "../helpers/Category";

const MONGO_URI = "mongodb://localhost:27017";
const DB_NAME = "mydb";

const client = new MongoClient(MONGO_URI);
const database = client.db(DB_NAME);

const categories = database.collection<Category>("categories");

export async function findAllCategories() {
  const allCategories: Category[] = await categories.find({}).toArray();
  return allCategories;
}
