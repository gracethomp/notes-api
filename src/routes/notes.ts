import express, { RequestHandler } from "express";
import {
  createNewNote,
  editNote,
  getAllNotes,
  getNoteById,
  getStats,
  removeNoteById,
} from "../services/notes";
import {
  objectIdSchema,
  patchSchema,
  postNoteSchema,
} from "../services/validation";

const validateObjectId: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    await objectIdSchema.validate(id);
    next();
  } catch (error) {
    res.status(400).json({ error: "Wrong id format" });
  }
};

const validateNewNoteData: RequestHandler = async (req, res, next) => {
  try {
    const requestBody = req.body;
    const result = await postNoteSchema.validate(requestBody, { strict: true });
    console.log(result);
    next();
  } catch (error) {
    res
      .status(400)
      .json({ error: "Validation error. Your request body is wrong" });
  }
};

const validateUpdateNote: RequestHandler = async (req, res, next) => {
  try {
    const requestBody = req.body;
    const result = await patchSchema.validate(requestBody, { strict: true });
    console.log(result);
    next();
  } catch (error) {
    res
      .status(400)
      .json({ error: "Validation error. Your request body is wrong" });
  }
};

const router = express.Router();

router.post("/", validateNewNoteData, async (req, res) => {
  try {
    const newNote = req.body;
    const newNoteId = await createNewNote(newNote);
    res.json({ message: "Created a note object " + newNoteId });
  } catch {
    res.status(500).json({ error: "Error while posting data" });
  }
});

router.patch("/:id", validateObjectId, validateUpdateNote, async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    await editNote(id, updates);
    res.json({ message: "Updated a note object " + id });
  } catch {
    res.status(500).json({ error: "Error while updating data" });
  }
});

router.delete("/:id", validateObjectId, async (req, res) => {
  try {
    const id = req.params.id;
    await removeNoteById(id);
    res.json({ message: "Successful delete note object with id " + id });
  } catch {
    res.status(500).json({ error: "Error while deleting data" });
  }
});

router.get("/stats", async (req, res) => {
  try {
    const stats = await getStats();
    res.send(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while retrieving statistics" });
  }
});

router.get("/:id", validateObjectId, async (req, res) => {
  try {
    const id = req.params.id;
    const note = await getNoteById(id);
    if (!note) {
      return res.status(404).json({ error: "Element not found" });
    }
    res.send(note);
  } catch {
    res.status(500).json({ error: "Error while retrieving data" });
  }
});

router.get("/", async (req, res) => {
  try {
    const allNotes = await getAllNotes();
    res.send(allNotes);
  } catch (error) {
    res.status(500).json({ error: "Error while retrieving data" });
  }
});

export default router;
