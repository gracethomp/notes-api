import { MongoClient, ObjectId } from "mongodb";
import { Note } from "../helpers/Note";

const MONGO_URI = "mongodb://localhost:27017";
const DB_NAME = "mydb";

const client = new MongoClient(MONGO_URI);
const database = client.db(DB_NAME);

const notes = database.collection<Note>("notes");

export async function insertNewNote(newNote: Note) {
  try {
    const insertOneResult = await notes.insertOne(newNote);
    return insertOneResult.insertedId;
  } catch (error) {
    throw new Error("error while adding");
  }
}

export async function deleteNodeById(id: ObjectId) {
  const query = { _id: id };
  const result = await notes.deleteOne(query);
  if (result.deletedCount === 1) {
    return true;
  } else {
    throw new Error("error while deleting");
  }
}

export async function findByID(id: ObjectId) {
  const query = { _id: id };
  const note = await notes.findOne<Note>(query);
  return note;
}

export async function findAllNotes() {
  const allNotes: Note[] = await notes.find({}).toArray();
  return allNotes;
}
