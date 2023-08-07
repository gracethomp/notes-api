import { object, boolean, string, ObjectSchema } from "yup";
import { findAllCategories } from "../repositories/categoriesRepository";
import { Category } from "../helpers/Category";

async function categoryExistsInDatabase(category: string) {
  const categories = await findAllCategories();
  return categories.some((item) => item.name === category);
}

export const postNoteSchema = object()
  .shape({
    name: string().required(),
    timeOfCreation: string().required(),
    noteCategory: string().required(),
    noteContent: string().required(),
    datesMentioned: string().defined(),
    isArchived: boolean().required(),
  })
  .test("is-valid-category", "Invalid category", async function (note) {
    return note.noteCategory
      ? await categoryExistsInDatabase(note.noteCategory)
      : false;
  })
  .noUnknown();

export const patchSchema = object()
  .shape({
    name: string().optional(),
    timeOfCreation: string().optional(),
    noteCategory: string().optional(),
    noteContent: string().optional(),
    datesMentioned: string().optional(),
    isArchived: boolean().optional(),
  })
  .test("is-valid-category", "Invalid category", async function (note) {
    return note.noteCategory
      ? await categoryExistsInDatabase(note.noteCategory)
      : note.noteCategory !== undefined ? false : true;
  })
  .noUnknown();

export const objectIdSchema = string().test(
  "valid-objectId",
  "Invalid ObjectId",
  (value) => {
    if (!value) return false;
    const validObjectIdRegex = /^[0-9a-fA-F]{24}$/;
    return validObjectIdRegex.test(value);
  }
);
