import express, { Request, Response } from "express";
const app = express();
app.get("/", (req: Request, res: Response) => {
  res.send("🏞️ Welcome to Tour Management System.");
});

export default app;
