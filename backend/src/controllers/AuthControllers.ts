import { UserModel } from "../models/Users";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
  const { email, password, username } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.json({
        msg: "User with this Email already exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new UserModel({
      email,
      password: hashedPassword,
      username,
    });
    await newUser.save();
    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET as string
    );
    return res.json({
      msg: "User created",
      token,
      username: newUser.username,
      id: newUser._id,
    });
  } catch (error) {
    console.log(error);
    return res.json({ msg: "Something went wrong" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.json({ msg: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        msg: "Wrong Password",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);
    return res.json({
      msg: "Logged in",
      token,
      username: user.username,
      id: user._id,
    });
  } catch (error) {
    console.log(error);
    return res.json({ msg: "Something went wrong" });
  }
};
