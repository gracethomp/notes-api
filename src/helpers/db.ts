import { MongoClient, Db } from "mongodb";

const MONGO_URI = "mongodb://localhost:27017";
const DB_NAME = "mydb";

let client: MongoClient;
let database: Db;

export async function connectToDatabase() {
  try {
    client = new MongoClient(MONGO_URI);
    await client.connect();
    database = client.db(DB_NAME);
  } catch (error) {
    throw new Error("Failed to connect to the database.");
  }
}

export function getDatabase() {
  if (!database) {
    throw new Error("Database connection not established.");
  }
  return database;
}
