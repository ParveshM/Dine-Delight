"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newMessage = exports.addNewChat = void 0;
const addNewChat = (senderId, recieverId, chatRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const isChatExist = yield chatRepository.isChatExists(senderId, recieverId);
    if (isChatExist)
        return isChatExist;
    return yield chatRepository.createNewChat([senderId, recieverId]);
});
exports.addNewChat = addNewChat;
const newMessage = (newMessageData, chatRepository) => __awaiter(void 0, void 0, void 0, function* () { return yield chatRepository.addNewMessage(newMessageData); });
exports.newMessage = newMessage;
