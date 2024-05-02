"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.updateRestaurantListing = exports.updateRestaurantRejected = exports.updateRestaurantApproval = exports.blockUser = void 0;
const restaurantApprovalEmail_1 = __importStar(require("../../../utils/restaurantApprovalEmail"));
const sendMail_1 = __importDefault(require("../../../utils/sendMail"));
const blockUser = (id, userDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userDbRepository.getUserbyId(id);
    yield userDbRepository.updateUserBlock(id, !(user === null || user === void 0 ? void 0 : user.isBlocked)); //update user block status
    return;
});
exports.blockUser = blockUser;
const updateRestaurantApproval = (id, restaurantDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const updated = yield restaurantDbRepository.updateRestaurantStatus(id, {
        isApproved: true,
        isListed: true,
    });
    if (updated) {
        (0, sendMail_1.default)(updated.email, "Restaurant account has been approved", (0, restaurantApprovalEmail_1.default)(updated.restaurantName));
    }
});
exports.updateRestaurantApproval = updateRestaurantApproval;
const updateRestaurantRejected = (id, restaurantDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const updated = yield restaurantDbRepository.updateRestaurantStatus(id, {
        isRejected: true,
    });
    if (updated) {
        (0, sendMail_1.default)(updated.email, "Restaurant account has been Rejected", (0, restaurantApprovalEmail_1.restaurantRejectionMail)(updated.restaurantName));
    }
});
exports.updateRestaurantRejected = updateRestaurantRejected;
const updateRestaurantListing = (id, restaurantDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurant = yield restaurantDbRepository.getRestaurantById(id);
    yield restaurantDbRepository.updateRestaurantStatus(id, {
        isListed: !(restaurant === null || restaurant === void 0 ? void 0 : restaurant.isListed),
    });
});
exports.updateRestaurantListing = updateRestaurantListing;
