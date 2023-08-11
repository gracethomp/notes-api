import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsBoolean,
  IsEnum,
} from 'class-validator';

enum Category {
  Task = 'Task',
  RandomThought = 'Random Thought',
  Idea = 'Idea',
}

export class CreateNoteDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsEnum(Category, { message: 'Invalid category value' })
  category: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsBoolean()
  @IsNotEmpty()
  isArchived: boolean;
}
