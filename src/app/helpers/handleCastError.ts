/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from "mongoose";
import { TGenericErrorResponse } from "../interfaces/error.type";

export const handleCastError = (
  error: mongoose.Error.CastError
): TGenericErrorResponse => {
  return {
    statusCode: 400,
    message: "Invalid MongoDB ObjectID! Please provide a Valid ID.",
  };
};