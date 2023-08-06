import express from "express";
import {
  createNewNote,
  editNote,
  getAllNodes,
  getNoteById,
  getStats,
  removeNoteById,
} from "../services/notes";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newNote = req.body;
    const newNoteId = await createNewNote(newNote);
    res.json({ message: "Create a note object " + newNoteId });
  } catch {
    res.json({ error: "Error while post data" });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const newNoteId = await editNote(id, updates);
    res.json({ message: "Update a note object " + newNoteId });
  } catch {
    res.json({ error: "Error while updating data" });
  }
});

router.delete("/:id", async (req, res) => {
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

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const note = await getNoteById(id);
  res.send(note);
});

router.get("/", async (req, res) => {
  const allNotes = await getAllNodes();
  res.send(allNotes);
});

export default router;
