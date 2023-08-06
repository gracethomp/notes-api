import express, { RequestHandler, Response } from "express";
import {
  createNewNote,
  editNote,
  getAllNodes,
  getNoteById,
  getStats,
  removeNoteById,
} from "../services/notes";
import { objectIdSchema, postNoteSchema } from "../services/validation";

const validateObjectId: RequestHandler = async (req, res, next) => {
  try {
    await objectIdSchema.validate(req.params.id);
    next();
  } catch (error) {
    res.status(400).json({ error: "Wrong id" });
  }
};

const validateNoteData: RequestHandler = async (req, res, next) => {
  try {
    await postNoteSchema.validate(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: "Validation error." });
  }
};

const router = express.Router();

router.post("/", validateNoteData, async (req, res) => {
  try {
    const newNote = req.body;
    const newNoteId = await createNewNote(newNote);
    res.json({ message: "Create a note object " + newNoteId });
  } catch {
    res.json({ error: "Error while post data" });
  }
});

router.patch("/:id", validateObjectId,  async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const noteId = await editNote(id, updates);
    res.json({ message: "Update a note object " + noteId });
  } catch {
    res.json({ error: "Error while updating data" });
  }
});

router.delete("/:id", validateObjectId,  async (req, res) => {
  try {
    const id = req.params.id;
    await removeNoteById(id);
    res.json({ message: "Successful delete note object with id " + id });
  } catch {
    res.json({ error: "Error while delete data" });
  }
});

router.get("/stats", async (req, res) => {
  const stats = await getStats();
  res.send(stats);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const id = req.params.id;
  const note = await getNoteById(id);
  res.send(note);
});

router.get("/", async (req, res) => {
  const allNotes = await getAllNodes();
  res.send(allNotes);
});

export default router;
