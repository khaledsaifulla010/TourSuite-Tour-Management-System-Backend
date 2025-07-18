/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/AppError";

export const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Something Went Wrong!";
  const errorSources: any = [];

  // Mongoose Duplicate Error
  if (error.code === 11000) {
    const matchedArray = error.message.match(/"([^"]*)"/);
    statusCode = 400;
    message = `${matchedArray[1]} already exist!`;
  }
  // Mongoose Cast Error (Object ID)
  else if (error.name === "CastError") {
    statusCode = 400;
    message = "Invalid MongoDB ObjectID! Please provide a Valid ID.";
  }

  // Mongoose Validation Error
  else if (error.name === "ValidationError") {
    statusCode = 400;
    const errors = Object.values(error.errors);

    errors.forEach((errorObj: any) =>
      errorSources.push({
        path: errorObj.path,
        message: errorObj.message,
      })
    );
    message = "Validation Error Occured!";
  }

  //
  else if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  } else if (error instanceof Error) {
    statusCode = 500;
    message = error.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    // error,
    stack: envVars.NODE_ENV === "development" ? error.stack : null,
  });
};
