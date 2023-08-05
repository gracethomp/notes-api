import { ObjectId } from "mongodb";

export interface Note {
  id: ObjectId;
  name: string;
  timeOfCreation: string;
  category: string;
  noteContent: string;
  datesMentioned: string;
  isArchived: boolean;
}
