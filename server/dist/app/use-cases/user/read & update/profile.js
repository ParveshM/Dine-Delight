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
exports.updateEmailSubscription = exports.addOrRemoveBookmarks = exports.WalletTransactions = exports.updateUser = exports.getUserProfile = void 0;
const getUserProfile = (userID, userRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepository.getUserbyId(userID);
    const wallet = yield userRepository.getWalletByUseId(userID);
    const walletId = wallet === null || wallet === void 0 ? void 0 : wallet._id;
    const transactions = yield userRepository.getTransactions(walletId);
    return { user, wallet, transactions };
});
exports.getUserProfile = getUserProfile;
const updateUser = (userID, updateData, userRepository) => __awaiter(void 0, void 0, void 0, function* () { return yield userRepository.updateProfile(userID, updateData); });
exports.updateUser = updateUser;
const WalletTransactions = (userId, userRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepository.getUserbyId(userId);
    const walletId = user === null || user === void 0 ? void 0 : user.wallet;
    return yield userRepository.getTransactions(walletId);
});
exports.WalletTransactions = WalletTransactions;
const addOrRemoveBookmarks = (userId, action, restaurantId, userRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const bookmarkData = {};
    if (action && action === "addToBookmarks") {
        bookmarkData.$push = { bookmarks: restaurantId };
    }
    else {
        bookmarkData.$pull = { bookmarks: restaurantId };
    }
    return yield userRepository.updateProfile(userId, bookmarkData);
});
exports.addOrRemoveBookmarks = addOrRemoveBookmarks;
const updateEmailSubscription = (restaurantId, userId, userRepository) => __awaiter(void 0, void 0, void 0, function* () { return yield userRepository.updateSubcription(restaurantId, userId); });
exports.updateEmailSubscription = updateEmailSubscription;
