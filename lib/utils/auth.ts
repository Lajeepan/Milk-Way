import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET: string = process.env.JWT_SECRET as string;

export const hashPassword = (password: string): string => {
  return bcrypt.hashSync(password, 8);
};

export const comparePassword = (password: string, hashedPassword: string): boolean => {
  return bcrypt.compareSync(password, hashedPassword);
};

export interface UserPayload {
  username: string;
  role: string;
}

export const generateToken = (user: UserPayload): string => {
  return jwt.sign(user, JWT_SECRET, { expiresIn: "1h" });
};

export const verifyToken = (token: string): UserPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as UserPayload;
  } catch (error) {
    console.log(error);
    return null;
  }
};
