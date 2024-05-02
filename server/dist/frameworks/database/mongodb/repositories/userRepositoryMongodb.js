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
exports.userRepositoryMongodb = void 0;
const user_1 = __importDefault(require("../models/user"));
const OTPmodel_1 = __importDefault(require("../models/OTPmodel"));
const wallet_1 = __importDefault(require("../models/wallet"));
const transactions_1 = __importDefault(require("../models/transactions"));
const EmailSubscription_1 = __importDefault(require("../models/EmailSubscription"));
const userRepositoryMongodb = () => {
    const getUserbyEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_1.default.findOne({ email }); // get the user with email
        return user;
    });
    const getUserbyId = (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield user_1.default.findById(id)
            .populate(["wallet", "bookmarks"])
            .select(["-password"]);
    });
    const updateUserBlock = (id, status) => __awaiter(void 0, void 0, void 0, function* () { return yield user_1.default.findByIdAndUpdate(id, { isBlocked: status }); });
    //   create new user by matching the entity type
    const addUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = new user_1.default({
            name: user.name(),
            email: user.getEmail(),
            password: user.getPassword(),
        });
        yield newUser.save();
        return newUser;
    });
    const addWallet = (userId) => __awaiter(void 0, void 0, void 0, function* () { return yield wallet_1.default.create({ userId }); });
    const updateWallet = (userId, newBalance) => __awaiter(void 0, void 0, void 0, function* () {
        return yield wallet_1.default.findOneAndUpdate({ userId }, { $inc: { balance: newBalance } });
    });
    const getWalletByUseId = (userId) => __awaiter(void 0, void 0, void 0, function* () { return yield wallet_1.default.findOne({ userId }); });
    const createTransaction = (transactionDetails) => __awaiter(void 0, void 0, void 0, function* () {
        return yield transactions_1.default.create({
            walletId: transactionDetails.getWalletId(),
            type: transactionDetails.getType(),
            description: transactionDetails.getDescription(),
            amount: transactionDetails.getAmount(),
        });
    });
    const allTransactions = (walletId) => __awaiter(void 0, void 0, void 0, function* () { return yield transactions_1.default.find({ walletId }).sort({ createdAt: -1 }); });
    const registerGoogleSignedUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
        return yield user_1.default.create({
            name: user.name(),
            email: user.email(),
            profilePicture: user.picture(),
            isVerified: user.email_verified(),
        });
    });
    const AddOTP = (OTP, userId) => __awaiter(void 0, void 0, void 0, function* () {
        yield OTPmodel_1.default.create({ OTP, userId });
    });
    const findOtpUser = (userId) => __awaiter(void 0, void 0, void 0, function* () { return yield OTPmodel_1.default.findOne({ userId }); });
    const deleteOtpUser = (userId) => __awaiter(void 0, void 0, void 0, function* () { return yield OTPmodel_1.default.deleteOne({ userId }); });
    const updateVerifiedUser = (userId) => __awaiter(void 0, void 0, void 0, function* () { return yield user_1.default.findByIdAndUpdate(userId, { isVerified: true }); });
    const updateVerificationCode = (email, code) => __awaiter(void 0, void 0, void 0, function* () { return yield user_1.default.findOneAndUpdate({ email }, { verificationCode: code }); });
    const findVerificationCode = (verificationCode) => __awaiter(void 0, void 0, void 0, function* () { return yield user_1.default.findOneAndUpdate({ verificationCode }); });
    const findVerificationCodeAndUpdate = (code, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
        return yield user_1.default.findOneAndUpdate({ verificationCode: code }, { password: newPassword, verificationCode: null }, { upsert: true });
    });
    const getAllUsers = (paginate) => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield user_1.default.find({ isVerified: true })
            .skip(paginate.skip)
            .limit(paginate.limit);
        const count = yield user_1.default.countDocuments({ isVerified: true });
        return { users, count };
    });
    const updateUserInfo = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () { return yield user_1.default.findByIdAndUpdate(id, updateData, { new: true }); });
    const countUsers = () => __awaiter(void 0, void 0, void 0, function* () { return yield user_1.default.countDocuments({ isVerified: true }); });
    const updateSubcription = (restaurant, user) => __awaiter(void 0, void 0, void 0, function* () { return yield EmailSubscription_1.default.create({ restaurant, user, isSubscribed: false }); });
    const isUserSubscribed = (user, restaurant) => __awaiter(void 0, void 0, void 0, function* () { return yield EmailSubscription_1.default.findOne({ user, restaurant }); });
    // exporting the functions
    return {
        getUserbyEmail,
        getUserbyId,
        addUser,
        addWallet,
        getWalletByUseId,
        updateWallet,
        createTransaction,
        allTransactions,
        registerGoogleSignedUser,
        AddOTP,
        findOtpUser,
        updateVerifiedUser,
        deleteOtpUser,
        getAllUsers,
        updateUserBlock,
        updateVerificationCode,
        findVerificationCode,
        findVerificationCodeAndUpdate,
        updateUserInfo,
        countUsers,
        updateSubcription,
        isUserSubscribed,
    };
};
exports.userRepositoryMongodb = userRepositoryMongodb;
