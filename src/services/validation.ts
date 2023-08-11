import { object, boolean, string, number } from "yup";
import { findAllCategories } from "../repositories/categoriesRepository";
import { Category } from "../helpers/Category";

async function categoryExistsInDatabase(category: number) {
  const categories = await findAllCategories();
  return categories.some((item) => item.id == category);
}

export const postNoteSchema = object()
  .shape({
    name: string().required(),
    timeofcreation: string().required(),
    notecategory: number().required(),
    notecontent: string().required(),
    datesmentioned: string().defined(),
    isarchived: boolean().required(),
  })
  .test("is-valid-category", "Invalid category", async function (note) {
    return note.notecategory
      ? await categoryExistsInDatabase(note.notecategory)
      : false;
  })
  .noUnknown();

export const patchSchema = object()
  .shape({
    name: string().optional(),
    timeOfCreation: string().optional(),
    noteCategory: number().optional(),
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

export const idSchema = number().positive().integer();