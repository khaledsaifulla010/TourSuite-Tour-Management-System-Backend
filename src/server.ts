/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin";
import { connectRedis } from "./app/config/redis.config";
let server: Server;
const startServer = async () => {
  try {
    console.log(envVars.NODE_ENV);
    await mongoose.connect(envVars.DATABASE_URL as string);
    console.log("🗄️ Connected to DataBase.");
    server = app.listen(envVars.PORT, () => {
      try {
        console.log(
          `🏞️ TourSuite-Tour-Management-System is Listening to Port ${envVars.PORT}.`
        );
      } catch (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

(async () => {
  await connectRedis();

  await startServer();

  // AUTOMATIC SUPER ADMIN CREATED IF FIRST TIME
  await seedSuperAdmin();
})();

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
