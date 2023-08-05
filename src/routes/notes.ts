import express from "express";
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

router.get("/stats", (req, res) => {
  res.json({ message: "Get aggregated data statistics" });
});

router.get("/:id", (req, res) => {
  res.json({ message: "Retrieve item." });
});

router.get("/", (req, res) => {
  res.json({ message: "All notes will be here" });
});

export default router;
