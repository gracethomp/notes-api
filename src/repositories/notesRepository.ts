import { MongoClient, ObjectId } from "mongodb";
import { Note } from "../helpers/Note";
import { getDatabase } from "../helpers/db";

export async function insertNewNote(newNote: Note) {
  try {
    const database = getDatabase();
    const notes = database.collection<Note>("notes");
    const insertOneResult = await notes.insertOne(newNote);
    return insertOneResult.insertedId;
  } catch (error) {
    throw new Error("error while inserting");
  }
}

export async function updateNote(id: ObjectId, updates: Object) {
  const database = getDatabase();
  const notes = database.collection<Note>("notes");
  const result = await notes.updateOne({ _id: id }, { $set: updates });
  if (result.modifiedCount === 1) {
    return true;
  } else {
    throw new Error("error while deleting");
  }
}

export async function deleteNodeById(id: ObjectId) {
  const database = getDatabase();
  const notes = database.collection<Note>("notes");
  const query = { _id: id };
  const result = await notes.deleteOne(query);
  if (result.deletedCount === 1) {
    return true;
  } else {
    throw new Error("error while deleting");
  }
}

export async function findNoteByID(id: ObjectId) {
  const database = getDatabase();
  const notes = database.collection<Note>("notes");
  const query = { _id: id };
  const note = await notes.findOne<Note>(query);
  if (!note) {
    throw new Error("Note wasn't found");
  }
  return note;
}

export async function findAllNotes() {
  const database = getDatabase();
  const notes = database.collection<Note>("notes");
  const allNotes: Note[] = await notes.find({}).toArray();
  return allNotes;
}
