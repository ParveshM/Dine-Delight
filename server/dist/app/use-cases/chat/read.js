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
exports.getLatestMessages = exports.getMessages = exports.getChatById = exports.getChats = void 0;
const getChats = (senderId, chatRepository) => __awaiter(void 0, void 0, void 0, function* () { return yield chatRepository.getAllConversations(senderId); });
exports.getChats = getChats;
const getChatById = (id, userId, chatRepository) => __awaiter(void 0, void 0, void 0, function* () {
    // await chatRepository.updateMessages(
    //   { conversationId: id, senderId: { $ne: userId } },
    //   { isRead: true }
    // );
    return yield chatRepository.getConversationById(id);
});
exports.getChatById = getChatById;
const getMessages = (conversationID, skip, limit, chatRepository) => __awaiter(void 0, void 0, void 0, function* () {
    return yield chatRepository.getPaginatedMessage({
        conversationId: conversationID,
    }, { skip, limit });
});
exports.getMessages = getMessages;
const getLatestMessages = (recieverId, chatRepository, conversationID) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = {
        senderId: recieverId,
        isRead: false,
    };
    conversationID && (filter.conversationId = conversationID);
    const messages = yield chatRepository.getLatestMessage(filter);
    return messages;
});
exports.getLatestMessages = getLatestMessages;
