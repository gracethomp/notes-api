import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { EditNoteDto } from './dto/edit-note.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class NotesService {
  private notes = [
    {
      id: '1',
      name: 'Note 1',
      date: '2023-08-10',
      category: 'Category 1',
      content: 'Content 1',
    },
  ];

  getAllNotes() {
    return this.notes;
  }

  getNoteById(id: string) {
    const note = this.notes.find((note) => note.id === id);
    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
    return note;
  }

  createNote(createNoteDto: CreateNoteDto) {
    const note = { id: uuidv4(), ...createNoteDto };
    this.notes.push(note);
    return note;
  }

  updateNote(id: string, editNoteDto: EditNoteDto) {
    const index = this.notes.findIndex((note) => note.id === id);
    if (index === -1) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
    this.notes[index] = { ...this.notes[index], ...editNoteDto };
    return this.notes[index];
  }

  removeNote(id: string) {
    const index = this.notes.findIndex((note) => note.id === id);
    if (index === -1) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
    const removedNote = this.notes.splice(index, 1)[0];
    return removedNote;
  }
}
