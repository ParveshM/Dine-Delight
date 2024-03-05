import { UserRepositoryMongodbType } from "../../frameworks/database/mongodb/repositories/userRepositoryMongodb";
import {
  googleSignInUserEntityType,
  userEntityType,
} from "../../entities/userEntity";

// Interface for the database repository that we need to use
/*
 * User db repository interfaces
 */

export const userDbRepository = (
  repository: ReturnType<UserRepositoryMongodbType>
) => {
  const getUserbyEmail = async (email: string) =>
    await repository.getUserbyEmail(email);

  const getUserbyId = async (id: string) => await repository.getUserbyId(id);

  const updateUserBlock = async (id: string, status: boolean) =>
    await repository.updateUserBlock(id, status);

  const addUser = async (user: userEntityType) =>
    await repository.addUser(user);

  const registerGoogleSignedUser = async (user: googleSignInUserEntityType) =>
    await repository.registerGoogleSignedUser(user);

  const addOTP = async (otp: string, id: string) =>
    await repository.AddOTP(otp, id);

  const findOtpUser = async (userId: string) =>
    await repository.findOtpUser(userId);

  const deleteOtpUser = async (userId: string) =>
    await repository.deleteOtpUser(userId);

  const updateVerifiedUser = async (userId: string) =>
    await repository.updateVerifiedUser(userId);

  const getAllUsers = async () => await repository.getAllUsers();

  return {
    getUserbyEmail,
    getUserbyId,
    updateUserBlock,
    addUser,
    registerGoogleSignedUser,
    addOTP,
    findOtpUser,
    updateVerifiedUser,
    deleteOtpUser,
    getAllUsers,
  };
};

export type UserDbInterface = typeof userDbRepository;
