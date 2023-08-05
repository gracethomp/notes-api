import { ObjectId } from "mongodb";
import {
  findByID,
  findAllNotes,
  insertNewNote,
  deleteNodeById,
} from "../repositories/notesRepository";
import { Note } from "../helpers/Note";
import { Category } from "../helpers/Category";
import { findAllCategories } from "../repositories/categoriesRepository";

export async function createNewNote(note: Note) {
  const id = await insertNewNote(note);
  return id;
}

export async function removeNoteById(id: string) {
  const objectId: ObjectId = new ObjectId(id);
  const result = await deleteNodeById(objectId);
  return result;
}

export async function getNoteById(id: string) {
  const objectId: ObjectId = new ObjectId(id);
  const newNote = await findByID(objectId);
  return newNote;
}

export async function getAllNodes() {
  const allNotes: Note[] = await findAllNotes();
  return allNotes;
}

export async function getStats() {
  const stats: Category[] = await findAllCategories();
  return stats;
}
