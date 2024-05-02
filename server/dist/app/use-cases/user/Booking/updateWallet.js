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
exports.updateWallet = void 0;
const transactionEntity_1 = __importDefault(require("../../../../entities/transactionEntity"));
const updateWallet = (userId, transactionData, userRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const { newBalance, type, description } = transactionData;
    const balance = type === "Debit" ? -newBalance : newBalance;
    const updateWallet = yield userRepository.updateWallet(userId, balance);
    if (updateWallet) {
        const transactionDetails = (0, transactionEntity_1.default)(updateWallet === null || updateWallet === void 0 ? void 0 : updateWallet._id, newBalance, type, description);
        const transaction = yield userRepository.createTransaction(transactionDetails);
    }
});
exports.updateWallet = updateWallet;
