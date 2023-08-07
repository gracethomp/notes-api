import { ObjectId, UpdateResult } from "mongodb";
import { Note } from "../helpers/Note";
import {
  findAllNotes,
  findNoteByID,
  insertNewNote,
  deleteNoteById,
  updateNote,
} from "../repositories/notesRepository";
import { findAllCategories } from "../repositories/categoriesRepository";

interface UpdateNote {
  name?: string;
  timeOfCreation?: string;
  noteCategory?: string;
  noteContent?: string;
  datesMentioned?: string;
  isArchived?: boolean;
}

interface CategoryStats {
  archived: number;
  active: number;
}

export async function createNewNote(note: Note): Promise<ObjectId> {
  const id = await insertNewNote(note);
  return id;
}

export async function editNote(
  id: string,
  updates: UpdateNote
): Promise<UpdateResult<Note>> {
  const objectId: ObjectId = new ObjectId(id);
  const updated = await updateNote(objectId, updates);
  return updated;
}

export async function removeNoteById(id: string): Promise<boolean> {
  const objectId: ObjectId = new ObjectId(id);
  const result = await deleteNoteById(objectId);
  if (result.deletedCount === 1) {
    return true;
  }
  return false;
}

export async function getNoteById(id: string): Promise<Note | undefined> {
  const objectId: ObjectId = new ObjectId(id);
  const newNote = await findNoteByID(objectId);
  return newNote;
}

export async function getAllNotes(): Promise<Note[]> {
  const allNotes: Note[] = await findAllNotes();
  return allNotes;
}

export async function getStats(): Promise<{
  [category: string]: CategoryStats;
}> {
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
}

const initCategoryStats = async (): Promise<{
  [category: string]: CategoryStats;
}> => {
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
