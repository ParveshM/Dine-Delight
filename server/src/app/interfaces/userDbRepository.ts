import { UserRepositoryMongodbType } from "../../frameworks/database/mongodb/repositories/userRepositoryMongodb";
import { userEntityType } from "../../entities/userEntity";

export const userDbRepository = (
  repository: ReturnType<UserRepositoryMongodbType>
) => {
  const getUserbyEmail = async (email: string) =>
    await repository.getUserbyEmail(email);

  const getUserbyId = async (id: string) => await repository.getUserbyId(id);

  const addUser = async (user: userEntityType) =>
    await repository.addUser(user);

  return { getUserbyEmail, getUserbyId, addUser };
};

export type UserDbInterface = typeof userDbRepository;
