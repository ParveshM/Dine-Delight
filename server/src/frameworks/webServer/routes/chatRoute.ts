import { Router } from "express";
import chatController from "../../../adapters/chatController";
import chatDbRepository from "../../../app/interfaces/chatDbRepository";
import { chatRepositoryMongodb } from "../../database/mongodb/repositories/chatRepositoryMongodb";

const chatRoute = () => {
  const router = Router();
  const _chatController = chatController(
    chatDbRepository,
    chatRepositoryMongodb
  );

  router.get("/conversation/:id", _chatController.getConversation);
  router.get("/conversations/:senderId", _chatController.fetchChats);
  router.post("/conversations", _chatController.createNewChat);

  router.post("/messages", _chatController.createNewMessage);
  router.get("/messages/:conversationId", _chatController.fetchMessages);

  return router;
};
export default chatRoute;
