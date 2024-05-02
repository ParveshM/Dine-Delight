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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRepositoryMongodb = void 0;
const Conversation_1 = __importDefault(require("../models/Conversation"));
const Message_1 = __importDefault(require("../models/Message"));
const chatRepositoryMongodb = () => {
    const isChatExists = (senderId, recieverId) => __awaiter(void 0, void 0, void 0, function* () { return yield Conversation_1.default.findOne({ members: { $all: [senderId, recieverId] } }); });
    const getConversationById = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield Conversation_1.default.findById(id); });
    const addNewChat = (members) => __awaiter(void 0, void 0, void 0, function* () {
        return yield Conversation_1.default.create({ members });
    });
    const getChatsByMembers = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield Conversation_1.default.find({ members: { $in: [id] } }); });
    const addNewMessage = (newMessageData) => __awaiter(void 0, void 0, void 0, function* () { return yield Message_1.default.create(newMessageData); });
    const messages = (filter) => __awaiter(void 0, void 0, void 0, function* () { return yield Message_1.default.find(filter); });
    const paginatedMessages = (filter, paginate) => __awaiter(void 0, void 0, void 0, function* () {
        return yield Message_1.default.find(filter)
            .sort({ createdAt: -1 })
            .skip(paginate.skip)
            .limit(paginate.limit);
    });
    const updateMessages = (filter, updateData) => __awaiter(void 0, void 0, void 0, function* () { return yield Message_1.default.updateMany(filter, updateData); });
    return {
        addNewChat,
        getChatsByMembers,
        getConversationById,
        isChatExists,
        addNewMessage,
        messages,
        updateMessages,
        paginatedMessages,
    };
};
exports.chatRepositoryMongodb = chatRepositoryMongodb;
