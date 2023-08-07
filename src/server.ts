import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import notes from './routes/notes';
import { connectToDatabase } from './helpers/db';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors());

app.use("/notes", notes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && "body" in err) {
    res.status(400).json({ error: "Invalid JSON in request body" });
  } else {
    next();
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.all("*", (req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

connectToDatabase();