import { object, boolean, string, ObjectSchema } from "yup";

export const postNoteSchema = object().shape({
  name: string().defined(),
  timeOfCreation: string().defined(),
  noteCategory: string().defined(),
  noteContent: string().defined(),
  datesMentioned: string().defined(),
  isArchived: boolean().defined(),
});

export const patchSchema = object().shape({
  name: string().optional(),
  timeOfCreation: string().optional(),
  noteCategory: string().optional(),
  noteContent: string().optional(),
  datesMentioned: string().optional(),
  isArchived: boolean().optional(),
});

export const objectIdSchema = string().test(
  "valid-objectId",
  "Invalid ObjectId",
  (value) => {
    if (!value) return false;
    const validObjectIdRegex = /^[0-9a-fA-F]{24}$/;
    return validObjectIdRegex.test(value);
  }
);
