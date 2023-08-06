import { ObjectId } from "mongodb";

export interface Note {
  _id: ObjectId;
  name: string;
  timeOfCreation: string;
  noteCategory: string;
  noteContent: string;
  datesMentioned: string;
  isArchived: boolean;
}
