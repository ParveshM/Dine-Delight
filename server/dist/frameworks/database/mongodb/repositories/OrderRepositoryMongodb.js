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
const Order_1 = __importDefault(require("../models/Order"));
function OrderRepositoryMongodb() {
    const createOrder = (orderData) => __awaiter(this, void 0, void 0, function* () {
        const { user, restaurant, orderItems, total, mobile, tableNumber } = orderData;
        const newOrder = yield Order_1.default.create({
            user,
            restaurant,
            orderItems,
            total,
            mobile,
            tableNumber,
        });
        return newOrder;
    });
    const getOrderById = (orderId) => __awaiter(this, void 0, void 0, function* () { return Order_1.default.findOne({ orderId }); });
    const allOrders = (filter, paginate) => __awaiter(this, void 0, void 0, function* () {
        const orders = yield Order_1.default.find(filter)
            .populate(["user", "orderItems.item"])
            .skip(paginate.skip)
            .limit(paginate.limit)
            .sort({ createdAt: -1 });
        const count = yield Order_1.default.countDocuments(filter);
        return { orders, count };
    });
    const updateOrder = (filter, updateData) => __awaiter(this, void 0, void 0, function* () { return yield Order_1.default.findOneAndUpdate(filter, updateData, { new: true }); });
    return { createOrder, getOrderById, allOrders, updateOrder };
}
exports.default = OrderRepositoryMongodb;
