import { Note } from "../helpers/Note";
import { getSequelizeModels } from "../helpers/db";

export async function insertNewNote(newNoteData : Note) {
  const { note } = getSequelizeModels();
  try {
    const newNote = await note.create(newNoteData);
    return newNote.id; 
  } catch (error) {
    throw new Error("Error while inserting");
  }
}

export async function updateNote(id : number, updates : Note) {
  const { note } = getSequelizeModels();
  try {
    const [updatedRowsCount] = await note.update(updates, {
      where: { id },
    });
    return updatedRowsCount;
  } catch (error) {
    throw new Error("Error while updating");
  }
}

export async function deleteNoteById(id : number) {
  const { note } = getSequelizeModels();
  try {
    const deletedRowsCount = await note.destroy({
      where: { id },
    });
    return deletedRowsCount;
  } catch (error) {
    throw new Error("Error while deleting");
  }
}

export async function findNoteByID(id : number) {
  const { note, Category } = getSequelizeModels();
  try {
    const neededNote = await note.findByPk(id, {
      attributes: ["id", "name", "timeofcreation", "notecontent", "datesmentioned", "isarchived"],
      include: [
        {
          model: Category,
          attributes: ["name"],
          as: 'notecategory', 
        },
      ],
    });
    console.log(neededNote?.notecategory);
    return neededNote;
  } catch (error) {
    throw new Error("Error while fetching");
  }
}

export async function findAllNotes() {
  const { note, Category } = getSequelizeModels();
  try {
    const allNotes = await note.findAll({
      attributes: ["id", "name", "timeofcreation", "notecontent", "datesmentioned", "isarchived"],
      include: [
        {
          model: Category,
          attributes: ["name"],
          as: 'category', 
        },
      ],
    });

    return allNotes;
  } catch (error) {
    console.log(error);
    throw new Error("Error while fetching: " + error);
  }
}

