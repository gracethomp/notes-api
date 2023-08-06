import { ObjectId } from "mongodb";
import {
  findNoteByID,
  findAllNotes,
  insertNewNote,
  deleteNodeById,
  updateNote,
} from "../repositories/notesRepository";
import { Note } from "../helpers/Note";
import {
  findAllCategories,
} from "../repositories/categoriesRepository";

interface CategoryStats {
  archived: number;
  active: number;
}

export async function createNewNote(note: Note) {
  const id = await insertNewNote(note);
  return id;
}

export async function editNote(id: string, updates: Object) {
  const objectId: ObjectId = new ObjectId(id);
  const updatedId = await updateNote(objectId, updates);
  return updatedId;
}

export async function removeNoteById(id: string) {
  const objectId: ObjectId = new ObjectId(id);
  const result = await deleteNodeById(objectId);
  return result;
}

export async function getNoteById(id: string) {
  const objectId: ObjectId = new ObjectId(id);
  const newNote = await findNoteByID(objectId);
  return newNote;
}

export async function getAllNodes() {
  const allNotes: Note[] = await findAllNotes();
  return allNotes;
}

export async function getStats() {
  const categories = await findAllCategories();
  const allNotes: Note[] = await findAllNotes();
  const categoryStats: { [category: string]: CategoryStats } = {};
  categories.forEach((category) => {
    categoryStats[category.name] = {
      archived: 0,
      active: 0,
    };
  });
  allNotes.forEach((note) => {
    const { noteCategory, isArchived } = note;
    if (categoryStats.hasOwnProperty(noteCategory)) {
      if (isArchived) {
        categoryStats[noteCategory].archived++;
      } else {
        categoryStats[noteCategory].active++;
      }
    }
  });
  return categoryStats;
}
