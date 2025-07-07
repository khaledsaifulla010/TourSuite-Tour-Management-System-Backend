/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
let server: Server;
const PORT = 5000;
const startServer = async () => {
  await mongoose.connect("mongodb://localhost:27017");
  console.log("🗄️ Connected to DataBase.");

  server = app.listen(PORT, () => {
    try {
      console.log(
        `🏞️ TourSuite-Tour-Management-System is Listening to Port ${PORT}.`
      );
    } catch (error) {
      console.log(error);
    }
  });
};

startServer();

// UnHandled Rejection Error //
process.on("unhandledRejection", (err) => {
  console.log("UnHandled Rejection Detected!...🔌Server Shutting Down🔌", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
// UnCaught Exception Error //
process.on("uncaughtException", (err) => {
  console.log("🔌UnCaught Exception Detected!...🔌Server Shutting Down🔌", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
//  Signal Termination Error //
process.on("SIGTERM", () => {
  console.log("🔌SIGTERM Signal Received!...🔌Server Shutting Down🔌");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

//  Signal Termination (Server Shutting Down manually)//
process.on("SIGINT", () => {
  console.log("🔌Server Shutting Down Gracefully...🔌");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
