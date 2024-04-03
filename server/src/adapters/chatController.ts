import { Request, Response, NextFunction } from "express";
import { ChatDbRepositoryInterace } from "../app/interfaces/chatDbRepository";
import { ChatRepositoryMongodbType } from "../frameworks/database/mongodb/repositories/chatRepositoryMongodb";
import { addNewChat } from "../app/use-cases/chat/add";
import { HttpStatus } from "../types/httpStatus";
import { getChats } from "../app/use-cases/chat/read";

const chatController = (
  chatDbRepository: ChatDbRepositoryInterace,
  chatDbRepositoryImpl: ChatRepositoryMongodbType
) => {
  const chatRepository = chatDbRepository(chatDbRepositoryImpl());

  const createNewChat = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { user, restaurant } = req.body;

      const chats = await addNewChat(user, restaurant, chatRepository);
      res.status(HttpStatus.OK).json({ success: true, chats });
    } catch (error) {
      next(error);
    }
  };

  const fetchChats = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { user } = req.body;
      const chats = await getChats(user, chatRepository);
      res.json(chats);
    } catch (error) {
      next(error);
    }
  };

  return {
    createNewChat,
    fetchChats,
  };
};
export default chatController;
