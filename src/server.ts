import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
let server: Server;
const PORT = 5000;
const startServer = async () => {
  await mongoose.connect("mongodb://localhost:27017");
  console.log("Connected to DataBase.");

  server = app.listen(PORT, () => {
    try {
      console.log(
        `TourSuite-Tour-Management-System is Listening to Port ${PORT}.`
      );
    } catch (error) {
      console.log(error);
    }
  });
};

startServer();
