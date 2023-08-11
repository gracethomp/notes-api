import { ObjectId, UpdateResult } from "mongodb";
import { Note } from "../helpers/Note";
import {
  findAllNotes,
  findNoteByID,
  insertNewNote,
  deleteNoteById,
  updateNote,
} from "../repositories/notesRepository";
import {
  findAllCategories,
  findByID,
} from "../repositories/categoriesRepository";
import { NoteInstance } from "../helpers/models";

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

export async function createNewNote(note: NoteInstance): Promise<number> {
  const id = await insertNewNote(note);
  return id;
}

export async function editNote(id: string, updates: Note): Promise<number> {
  const updated = await updateNote(parseInt(id), updates);
  return updated;
}

export async function removeNoteById(id: string): Promise<boolean> {
  const objectId: ObjectId = new ObjectId(id);
  const result = await deleteNoteById(parseInt(id));
  return result === 1;
}

export async function getNoteById(id: string): Promise<NoteInstance | null> {
  const newNote = await findNoteByID(parseInt(id));
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
  const allNotes = await findAllNotes();
  allNotes.forEach((note) => {
    if (categoryStats.hasOwnProperty(note.category.name)) {
      if (note.isarchived) {
        categoryStats[note.category.name].archived++;
      } else {
        categoryStats[note.category.name].active++;
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
