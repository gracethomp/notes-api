import { ObjectId } from "mongodb";
import {
  findNoteByID,
  findAllNotes,
  insertNewNote,
  deleteNodeById,
  updateNote,
} from "../repositories/notesRepository";
import { Note } from "../helpers/Note";
import { findAllCategories } from "../repositories/categoriesRepository";

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
  const updated = await updateNote(objectId, updates);
  if(updated.matchedCount === 0) {
    throw new Error("Note wasn't found");
  }
  return updated;
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
  const categoryStats: { [category: string]: CategoryStats } =
    await calculateStats();
  return categoryStats;
}

const initCategoryStats = async () => {
  const categories = await findAllCategories();
  const categoryStats: { [category: string]: CategoryStats } = {};
  categories.forEach((category) => {
    categoryStats[category.name] = {
      archived: 0,
      active: 0,
    };
  });
  return categoryStats;
};

const calculateStats = async () => {
  const categoryStats: { [category: string]: CategoryStats } =
    await initCategoryStats();
  const allNotes: Note[] = await findAllNotes();
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
};
