import { IUser } from "./user.interface";
import { User } from "./user.model";

// CREATE A USER
const createUser = async (payload: Partial<IUser>) => {
  const { name, email } = payload;
  const user = await User.create({
    name,
    email,
  });
  return user;
};

// GET ALL USER //

const getAllUsers = async () => {
  const users = await User.find({});
  const totalUsers = await User.countDocuments();
  return {
    data: users,
    meta: { total: totalUsers },
  };
};

export const UserServices = {
  createUser,
  getAllUsers,
};
