"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chatController_1 = __importDefault(require("../../../adapters/chatController"));
const chatDbRepository_1 = __importDefault(require("../../../app/interfaces/chatDbRepository"));
const chatRepositoryMongodb_1 = require("../../database/mongodb/repositories/chatRepositoryMongodb");
const chatRoute = () => {
    const router = (0, express_1.Router)();
    const _chatController = (0, chatController_1.default)(chatDbRepository_1.default, chatRepositoryMongodb_1.chatRepositoryMongodb);
    router.get("/conversation/:id", _chatController.getConversation);
    router.get("/conversations/:senderId", _chatController.fetchChats);
    router.post("/conversations", _chatController.createNewChat);
    router.post("/messages", _chatController.createNewMessage);
    router.get("/messages", _chatController.fetchMessages);
    return router;
};
exports.default = chatRoute;
