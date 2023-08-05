import express from "express";
import { createNewNote, getAllNodes, getNoteById, getStats } from "../services/notes";

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

router.patch("/:id", (req, res) => {
  res.json({ message: "Edit item." });
});

router.delete("/:id", (req, res) => {
  res.json({ message: "Remove item" });
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
