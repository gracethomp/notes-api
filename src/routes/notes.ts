import express from "express";
import { getAllNodes, getNoteById, getStats } from "../services/notes";
import { ObjectId } from "mongodb";
const router = express.Router();

router.post("/", (req, res) => {
  res.json({ message: "Create a note object" });
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
