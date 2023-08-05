import { ObjectId } from "mongodb";
import { findByID } from "../repositories/notesRepository";


export async function getNoteById(id:ObjectId) {
    const newNote = await findByID(id);
    return newNote;
}