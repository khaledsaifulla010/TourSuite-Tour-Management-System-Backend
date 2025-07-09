import express, { Request, Response } from "express";
import cors from "cors";
import { router } from "./app/routes";
const app = express();
app.use(express.json());
app.use(cors());

// API END POINTS
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("🏞️ Welcome to Tour Management System.");
});

export default app;
