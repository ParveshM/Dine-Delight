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
exports.addMoreItemToOrder = exports.updateOrderItem = exports.getAllOrders = exports.createNewOrder = void 0;
const httpStatus_1 = require("../../../../types/httpStatus");
const customError_1 = __importDefault(require("../../../../utils/customError"));
const createNewOrder = (userId, orderData, orderRepository) => __awaiter(void 0, void 0, void 0, function* () {
    orderData.user = userId;
    return yield orderRepository.createOrder(orderData);
});
exports.createNewOrder = createNewOrder;
const getAllOrders = (filter, paginate, orderRepository) => __awaiter(void 0, void 0, void 0, function* () { return yield orderRepository.allOrders(filter, paginate); });
exports.getAllOrders = getAllOrders;
const updateOrderItem = (orderId, updateData, orderRepository) => __awaiter(void 0, void 0, void 0, function* () { return yield orderRepository.updateOrder({ orderId }, updateData); });
exports.updateOrderItem = updateOrderItem;
const addMoreItemToOrder = (orderId, updateData, orderRepository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield orderRepository.getOrderById(orderId);
        for (const newItem of updateData.orderItems) {
            const existingItem = order &&
                order.orderItems.find((item) => { var _a; return ((_a = item.item) === null || _a === void 0 ? void 0 : _a.toString()) === newItem.item.toString(); });
            if (existingItem) {
                yield orderRepository.updateOrder({ orderId, "orderItems.item": newItem.item }, { $inc: { "orderItems.$.quantity": newItem.quantity } });
            }
            else {
                yield orderRepository.updateOrder({ orderId }, { $push: { orderItems: newItem } });
            }
        }
        return yield orderRepository.getOrderById(orderId);
    }
    catch (error) {
        console.error("Error updating order items:", error);
        throw new customError_1.default("Error updating order items", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
});
exports.addMoreItemToOrder = addMoreItemToOrder;
