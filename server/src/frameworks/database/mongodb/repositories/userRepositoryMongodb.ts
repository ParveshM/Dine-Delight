import {
  googleSignInUserEntityType,
  userEntityType,
} from "../../../../entities/userEntity";
import { UserInterface } from "../../../../types/userInterface";
import User from "../models/user";
import OTPModel from "../models/OTPmodel";

export const userRepositoryMongodb = () => {
  const getUserbyEmail = async (email: string) => {
    const user: UserInterface | null = await User.findOne({ email }); // get the user with email
    return user;
  };

  const getUserbyId = async (id: string) => await User.findById(id); //   get userby Id

  const updateUserBlock = async (id: string, status: boolean) =>
    await User.findByIdAndUpdate(id, { isBlocked: status });

  //   create new user by matching the entity type
  const addUser = async (user: userEntityType) => {
    const newUser: any = new User({
      name: user.name(),
      email: user.getEmail(),
      password: user.getPassword(),
    });
    await newUser.save();
    return newUser;
  };

  const registerGoogleSignedUser = async (user: googleSignInUserEntityType) => {
    const newUser = new User({
      name: user.name(),
      email: user.email(),
      profilePicture: user.picture(),
      isVerified: user.email_verified(),
    });

    await newUser.save();
    return newUser;
  };

  const AddOTP = async (OTP: string, userId: string) => {
    await OTPModel.create({ OTP, userId });
  };

  const findOtpUser = async (userId: string) =>
    await OTPModel.findOne({ userId });

  const deleteOtpUser = async (userId: string) =>
    await OTPModel.deleteOne({ userId });

  const updateVerifiedUser = async (userId: string) =>
    await User.findByIdAndUpdate(userId, { isVerified: true });

  const updateVerificationCode = async (email: string, code: string) =>
    await User.findOneAndUpdate({ email }, { verificationCode: code });

  const findVerificationCode = async (verificationCode: string) =>
    await User.findOneAndUpdate({ verificationCode });

  const findVerificationCodeAndUpdate = async (
    code: string,
    newPassword: string
  ) =>
    await User.findOneAndUpdate(
      { verificationCode: code },
      { password: newPassword, verificationCode: null },
      { upsert: true }
    );

  const getAllUsers = async () => await User.find({ isVerified: true });

  // exporting the functions
  return {
    getUserbyEmail,
    getUserbyId,
    addUser,
    registerGoogleSignedUser,
    AddOTP,
    findOtpUser,
    updateVerifiedUser,
    deleteOtpUser,
    getAllUsers,
    updateUserBlock,
    updateVerificationCode,
    findVerificationCode,
    findVerificationCodeAndUpdate,
  };
};

// exporting the type to match the repostory function types
export type UserRepositoryMongodbType = typeof userRepositoryMongodb;
