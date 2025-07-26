import z from "zod";
import { IsActive, Role } from "./user.interface";

// CREATE USER VALIDATION //
export const createUserZodSchema = z.object({
  name: z
    .string({ invalid_type_error: "Name must be string!" })
    .min(2, { message: "Name too short. Minimum 2 characters long!" })
    .max(50, { message: "Name too long!" }),
  email: z
    .string({ invalid_type_error: "Email must be string!" })
    .email({ message: "Invalid email address format!" })
    .min(5, { message: "Email must be at least 5 characters long!" })
    .max(50, { message: "Email cannnot exceed 100 characters!" }),
  // 1 uppercase, 1 special character, 1 digit, & characters min
  password: z
    .string({ invalid_type_error: "Password must be string!" })
    .min(8, { message: "Password must be at least 8 characters long!" })
    .regex(/^(?=.*[A-Z])/, {
      message: "Password must contain atleast 1 uppercase letter!",
    })
    .regex(/^(?=.*[!@#$%^&*])/, {
      message: "Password must contain atleast 1 special character!",
    })
    .regex(/^(?=.*\d)/, {
      message: "Password must contain atleast 1 number!",
    }),
  phone: z
    .string({ invalid_type_error: "Phone Number must be string!" })
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
      message:
        "Phone Number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    })
    .optional(),
  address: z
    .string({ invalid_type_error: "Address must be string!" })
    .max(200, { message: "Address cannot exceed 200 characters" })
    .optional(),
});

// UPDATE USER VALIDATION //
export const updateUserZodSchema = z.object({
  name: z
    .string({ invalid_type_error: "Name must be string!" })
    .min(2, { message: "Name too short. Minimum 2 characters long!" })
    .max(50, { message: "Name too long!" })
    .optional(),
  // 1 uppercase, 1 special character, 1 digit, & characters min
  // password: z
  //   .string({ invalid_type_error: "Password must be string!" })
  //   .min(8, { message: "Password must be at least 8 characters long!" })
  //   .regex(/^(?=.*[A-Z])/, {
  //     message: "Password must contain atleast 1 uppercase letter!",
  //   })
  //   .regex(/^(?=.*[!@#$%^&*])/, {
  //     message: "Password must contain atleast 1 special character!",
  //   })
  //   .regex(/^(?=.*\d)/, {
  //     message: "Password must contain atleast 1 number!",
  //   })
  //   .optional(),
  phone: z
    .string({ invalid_type_error: "Phone Number must be string!" })
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
      message:
        "Phone Number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    })
    .optional(),
  address: z
    .string({ invalid_type_error: "Address must be string!" })
    .max(200, { message: "Address cannot exceed 200 characters" })
    .optional(),
  role: z.enum(Object.values(Role) as [string]).optional(),
  isActive: z.enum(Object.values(IsActive) as [string]).optional(),
  isDeleted: z
    .boolean({ invalid_type_error: "isDeleted must be true or false" })
    .optional(),
  isVerified: z
    .boolean({ invalid_type_error: "isVerified must be true or false" })
    .optional(),
});
