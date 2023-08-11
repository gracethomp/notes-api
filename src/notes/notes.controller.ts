import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { EditNoteDto } from './dto/edit-note.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  findAll() {
    return this.notesService.getAllNotes();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notesService.getNoteById(id);
  }

  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.createNote(createNoteDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() editNoteDto: EditNoteDto) {
    return this.notesService.updateNote(id, editNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notesService.removeNote(id);
  }
}
