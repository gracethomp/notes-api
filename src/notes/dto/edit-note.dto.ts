import { PartialType } from '@nestjs/mapped-types';
import { CreateNoteDto } from './create-note.dto';

export class EditNoteDto extends PartialType(CreateNoteDto) {}
