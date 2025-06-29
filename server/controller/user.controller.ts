import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import cloudinary from "../utils/cloudinary";
import { generateToken } from "../utils/generateToken";
import { generateVerificationCode } from "../utils/generateVerificationCode";
import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../mailtrap/email";

export const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password, contact } = req.body;
    if (!username || !email || !password || !contact) {
      res
        .status(400)
        .json({ success: false, message: "All fields are required" });
      return;
    }

    let existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "User already exists",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = generateVerificationCode(); //6-digit verification token

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      contact: Number(contact),
      verificationToken,
      verificationTokenExpiredAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    console.log(user);

    generateToken(res, user); //Generates jwt token

    await sendVerificationEmail(email, verificationToken);

    //send user w/o password
    const userWithoutPassword = await User.findOne({ email }).select(
      "-password"
    );
    //or
    // const { password: _, ...userData } = user.toObject();

    res.status(201).json({
      success: true,
      message: "Account Created Successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res
        .status(400)
        .json({ success: false, message: "Incorrect email or password" });
      return;
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
      return;
    }

    generateToken(res, user);
    user.lastLogin = new Date();
    await user.save();

    const userWithoutPassword = await User.findOne({ email }).select(
      "-password"
    );
    res.status(200).json({
      success: true,
      message: `Welcome back ${user.username}`,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const verifyEmail = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { verificationCode } = req.body;
    console.log(verificationCode);

    const user = await User.findOne({
      verificationToken: verificationCode,
      verificationTokenExpiredAt: { $gt: new Date() },
    }).select("-password");

    if (!user) {
      res.status(400).json({
        success: false,
        message: "Invalid or expired verification token",
      });
      return;
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiredAt = undefined;

    await user.save();

    await sendWelcomeEmail(user.email, user.username);

    res
      .status(200)
      .json({ success: true, message: "Email verified successfully.", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    res.clearCookie("token").status(200).json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({
        success: false,
        message: "User doesn't exist",
      });
      return;
    }

    const resetToken = crypto.randomBytes(40).toString("hex");
    const resetTokenExpiredAt = new Date(Date.now() + 60 * 60 * 1000);

    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpiresAt = resetTokenExpiredAt;
    await user.save();

    await sendPasswordResetEmail(
      email,
      `${process.env.FRONTEND_URI}/resetpassword/${resetToken}`
    );

    res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const resetPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpiresAt: { $gt: new Date() },
    });

    if (!user) {
      res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiresAt = undefined;
    await user.save();

    await sendResetSuccessEmail(user.email);

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const checkAuth = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not Found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.id;
    const { username, email, address, city, country, profilePicture } =
      req.body;

    let cloudResponse;
    if (profilePicture) {
      cloudResponse = await cloudinary.uploader.upload(profilePicture, {
        folder: "user_profiles",
        public_id: `${userId}_${Date.now()}`,
      });
    }

    const updatedData = {
      username,
      email,
      address,
      city,
      country,
      profilePicture: cloudResponse?.secure_url,
    };

    const user = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    }).select("-password");

    console.log("no succ");

    res.status(200).json({
      success: true,
      user,
      message: "Profile updated successfully",
    });
    console.log("yes succ");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
