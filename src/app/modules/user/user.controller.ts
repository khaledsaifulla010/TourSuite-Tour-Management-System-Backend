/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";

// CREATE A USER CONTROLLER
const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserServices.createUser(req.body);
    res.status(httpStatus.CREATED).json({
      sucess: true,
      message: "User Created Sucessfully.",
      user,
    });
  }
);

// GET ALL USER CONTROLLER //

const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await UserServices.getAllUsers();
    res.status(httpStatus.OK).json({
      sucess: true,
      message: "All Users Retrieved Sucessfully.",
      data: users,
    });
  }
);

export const UserControllers = {
  createUser,
  getAllUsers,
};
