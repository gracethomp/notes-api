import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import notes from './routes/notes';
import { connectToDatabase } from './helpers/db';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.use("/notes", notes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.all("*", (req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

connectToDatabase();