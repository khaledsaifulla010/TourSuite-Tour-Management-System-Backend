import express, { Request, Response } from "express";
import cors from "cors";
import { router } from "./app/routes";
import { globalErrorHandler } from "./app/middlewares/GlobalErrorHandler";
import NotFoundRoute from "./app/middlewares/NotFoundRoute";
import cookieParser from "cookie-parser";
import passport from "passport";
import expressSession from "express-session";
import "./app/config/passport";
const app = express();
app.use(
  expressSession({
    secret: "724ggn5lm1hdt0j",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(express.json());
app.use(cors());

// API END POINTS
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("🏞️ Welcome to Tour Management System.");
});

//GLOBAL ERROR Handler
app.use(globalErrorHandler);

// NOT FOUND ROUTE //
app.use(NotFoundRoute);

export default app;
