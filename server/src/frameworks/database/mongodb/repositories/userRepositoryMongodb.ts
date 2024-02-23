import { userEntityType } from "../../../../entities/userEntity";
import { UserInterface } from "../../../../types/userInterface";
import User from "../models/user";

export const userRepositoryMongodb = () => {
  // get the user with email
  const getUserbyEmail = async (email: string) => {
    const user: UserInterface | null = await User.findOne({ email });
    return user;
  };
  //   get userby Id
  const getUserbyId = async (id: string) => await User.findById(id);

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

  // exporting the functions
  return {
    getUserbyEmail,
    getUserbyId,
    addUser,
  };
};

// exporting the type to match the repostory function types
export type UserRepositoryMongodbType = typeof userRepositoryMongodb;
