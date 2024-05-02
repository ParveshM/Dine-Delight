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
function OrderDbRepository(repository) {
    const createOrder = (orderData) => __awaiter(this, void 0, void 0, function* () { return repository.createOrder(orderData); });
    const getOrderById = (orderId) => __awaiter(this, void 0, void 0, function* () { return repository.getOrderById(orderId); });
    const allOrders = (filter, paginate) => __awaiter(this, void 0, void 0, function* () { return repository.allOrders(filter, paginate); });
    const updateOrder = (filter, updateData) => __awaiter(this, void 0, void 0, function* () { return repository.updateOrder(filter, updateData); });
    return { createOrder, getOrderById, allOrders, updateOrder };
}
exports.default = OrderDbRepository;
