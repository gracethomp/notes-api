import { MongoClient, ObjectId } from "mongodb";
import { Note } from "../helpers/Note";

const MONGO_URI = "mongodb://localhost:27017";
const DB_NAME = "mydb";

const client = new MongoClient(MONGO_URI);
const database = client.db(DB_NAME);

const notes = database.collection<Note>("notes");

export async function findByID(id: ObjectId) {
  const note = await notes.findOne<Note>({ _id: id });
  return note;
}

export async function findAllNotes() {
  const allNotes: Note[] = await notes.find({}).toArray();
  return allNotes;
}
