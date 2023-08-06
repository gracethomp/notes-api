import { object, boolean, string, ObjectSchema } from "yup";

export const postNoteSchema = object().shape({
  name: string().defined(),
  timeOfCreation: string().defined(),
  noteCategory: string().defined(),
  noteContent: string().defined(),
  datesMentioned: string().defined(),
  isArchived: boolean().defined(),
}).noUnknown();

export const patchSchema = object().shape({
  name: string(),
  timeOfCreation: string(),
  noteCategory: string(),
  noteContent: string(),
  datesMentioned: string(),
  isArchived: boolean(),
}).noUnknown();

export const objectIdSchema = string().test(
  "valid-objectId",
  "Invalid ObjectId",
  (value) => {
    if (!value) return false;
    const validObjectIdRegex = /^[0-9a-fA-F]{24}$/;
    return validObjectIdRegex.test(value);
  }
);
