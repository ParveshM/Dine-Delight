import { Request, Response, NextFunction } from "express";
import { ChatDbRepositoryInterace } from "../app/interfaces/chatDbRepository";
import { ChatRepositoryMongodbType } from "../frameworks/database/mongodb/repositories/chatRepositoryMongodb";
import { addNewChat, newMessage } from "../app/use-cases/chat/add";
import { HttpStatus } from "../types/httpStatus";
import {
  getChatById,
  getChats,
  getLatestMessages,
  getMessages,
} from "../app/use-cases/chat/read";
import { get } from "mongoose";
import { updateUnreadMessages } from "../app/use-cases/chat/update";

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
      const { recieverId, senderId } = req.query as {
        recieverId: string;
        senderId: string;
      };
      recieverId &&
        (await updateUnreadMessages(id, recieverId, chatRepository));
      const chats = await getChatById(id, senderId, chatRepository);
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
      const { unReadMessages, recieverId, conversationId } = req.query as {
        unReadMessages: string;
        recieverId: string;
        conversationId: string;
      };
      const page = parseInt(req.query.page as string);
      const limit = 5;
      const skip = (page - 1) * limit;

      // if (!conversationId) {
      //   const latestMessages = await getLatestMessages(
      //     recieverId,
      //     chatRepository
      //   );

      //   return res
      //     .status(HttpStatus.OK)
      //     .json({ success: true, latestMessages });
      // }

      let latestMessages = null;
      if (unReadMessages) {
        latestMessages = await getLatestMessages(
          recieverId,
          chatRepository,
          conversationId
        );
      }

      const messages = await getMessages(
        conversationId,
        skip,
        limit,
        chatRepository
      );
      res
        .status(HttpStatus.OK)
        .json({ success: true, messages, latestMessages });
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
