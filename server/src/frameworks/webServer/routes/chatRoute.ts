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

  router.post("/newChat", _chatController.createNewChat);
  router.get("/messages", _chatController.fetchChats);

  return router;
};
export default chatRoute;
