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
function chatDbRepository(repository) {
    const isChatExists = (senderId, recieverId) => __awaiter(this, void 0, void 0, function* () { return repository.isChatExists(senderId, recieverId); });
    const getConversationById = (id) => __awaiter(this, void 0, void 0, function* () { return repository.getConversationById(id); });
    const createNewChat = (members) => __awaiter(this, void 0, void 0, function* () { return yield repository.addNewChat(members); });
    const getAllConversations = (id) => __awaiter(this, void 0, void 0, function* () { return yield repository.getChatsByMembers(id); });
    const addNewMessage = (newMessageData) => __awaiter(this, void 0, void 0, function* () { return yield repository.addNewMessage(newMessageData); });
    const getLatestMessage = (filter) => __awaiter(this, void 0, void 0, function* () { return yield repository.messages(filter); });
    const getPaginatedMessage = (filter, pagination) => __awaiter(this, void 0, void 0, function* () { return yield repository.paginatedMessages(filter, pagination); });
    const updateMessages = (filter, updateData) => __awaiter(this, void 0, void 0, function* () { return yield repository.updateMessages(filter, updateData); });
    return {
        createNewChat,
        addNewMessage,
        isChatExists,
        getConversationById,
        getAllConversations,
        getLatestMessage,
        updateMessages,
        getPaginatedMessage,
    };
}
exports.default = chatDbRepository;
