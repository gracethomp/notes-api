import { object, boolean, string, number } from "yup";
import { findAllCategories } from "../repositories/categoriesRepository";

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
    timeofcreation: string().optional(),
    notecategory: number().optional(),
    notecontent: string().optional(),
    datesmentioned: string().optional(),
    isarchived: boolean().optional(),
  })
  .test("is-valid-category", "Invalid category", async function (note) {
    return note.noteCategory
      ? await categoryExistsInDatabase(note.noteCategory)
      : note.noteCategory !== undefined ? false : true;
  })
  .noUnknown();

export const idSchema = number().positive().integer();