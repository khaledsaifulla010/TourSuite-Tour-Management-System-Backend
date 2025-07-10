/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserServices } from "./user.service";
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // throw new AppError(httpStatus.BAD_REQUEST,"Fake Error","")
    const user = await UserServices.createUser(req.body);
    res.status(httpStatus.CREATED).json({
      sucess: true,
      message: "User Created Sucessfully.",
      user,
    });
  } catch (error: any) {
    next(error);
  }
};
export const UserControllers = {
  createUser,
};
