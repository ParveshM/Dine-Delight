import { Request, Response, NextFunction } from "express";
import { ChatDbRepositoryInterace } from "../app/interfaces/chatDbRepository";
import { ChatRepositoryMongodbType } from "../frameworks/database/mongodb/repositories/chatRepositoryMongodb";
import { addNewChat, newMessage } from "../app/use-cases/chat/add";
import { HttpStatus } from "../types/httpStatus";
import { getChatById, getChats, getMessages } from "../app/use-cases/chat/read";
import { get } from "mongoose";

const chatController = (
  chatDbRepository: ChatDbRepositoryInterace,
  chatDbRepositoryImpl: ChatRepositoryMongodbType
) => {
  const chatRepository = chatDbRepository(chatDbRepositoryImpl());
  /*
   * METHOD:POST
   * create new chats with two users
   */
  const createNewChat = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { senderId, recieverId } = req.body;

      const chats = await addNewChat(senderId, recieverId, chatRepository);
      res.status(HttpStatus.OK).json({ success: true, chats });
    } catch (error) {
      next(error);
    }
  };
  /*
   * METHOD:GET
   * Retrive all the conversations/chats between the users
   */
  const fetchChats = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { senderId } = req.params;
      const chats = await getChats(senderId, chatRepository);
      res.status(HttpStatus.OK).json(chats);
    } catch (error) {
      next(error);
    }
  };
  /*
   * METHOD:GET
   * Retrive  the conversations by conversation ID
   */
  const getConversation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const chats = await getChatById(id, chatRepository);
      res.status(HttpStatus.OK).json(chats);
    } catch (error) {
      next(error);
    }
  };
  /*
   * METHOD:POST
   * create new send messages to the users
   */
  const createNewMessage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const message = await newMessage(req.body, chatRepository);
      res.status(HttpStatus.OK).json(message);
    } catch (error) {
      next(error);
    }
  };
  /*
   * METHOD:GET
   * Retrive all  messages from  the users
   */
  const fetchMessages = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { conversationId } = req.params;
      const chats = await getMessages(conversationId, chatRepository);
      res.status(HttpStatus.OK).json(chats);
    } catch (error) {
      next(error);
    }
  };

  return {
    createNewChat,
    fetchChats,
    getConversation,
    createNewMessage,
    fetchMessages,
  };
};
export default chatController;
