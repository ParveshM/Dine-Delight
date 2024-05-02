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
exports.bookingRepositoryMongodb = void 0;
const Booking_1 = __importDefault(require("../models/Booking"));
const Preorder_1 = __importDefault(require("../models/Preorder"));
const mongoose_1 = require("mongoose");
const bookingRepositoryMongodb = () => {
    const createBooking = (reservationData) => __awaiter(void 0, void 0, void 0, function* () {
        return yield Booking_1.default.create({
            userId: reservationData.getUserId(),
            restaurantId: reservationData.getRestaurantId(),
            tableId: reservationData.getTableId(),
            tableSlotId: reservationData.getTableSlotId(),
            paymentMethod: reservationData.getPaymentMethod(),
            gstAmount: reservationData.getGstAmount(),
            totalAmount: reservationData.getTotalAmount(),
        });
    });
    const getBookingById = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield Booking_1.default.findOne({ bookingId }).populate([
            "restaurantId",
            "tableId",
            "tableSlotId",
            "userId",
        ]);
    });
    const updateBooking = (bookingId, updatingData) => __awaiter(void 0, void 0, void 0, function* () {
        return yield Booking_1.default.findOneAndUpdate({ bookingId }, updatingData, {
            new: true,
            upsert: true,
        });
    });
    const updateAdminPayment = (bookingId, Amount) => __awaiter(void 0, void 0, void 0, function* () {
        return yield Booking_1.default.updateOne({ bookingId }, {
            $set: { adminPayment: Amount },
        });
    });
    const bookings = (filter) => __awaiter(void 0, void 0, void 0, function* () {
        return yield Booking_1.default.find(filter)
            .populate(["restaurantId", "tableId", "tableSlotId", "userId"])
            .sort({ createdAt: -1 });
    });
    const paginatedBookings = (filter, skip, limit) => __awaiter(void 0, void 0, void 0, function* () {
        const count = yield Booking_1.default.countDocuments(filter);
        const bookings = yield Booking_1.default.find(filter)
            .populate(["restaurantId", "tableId", "tableSlotId", "userId"])
            .limit(limit)
            .skip(skip)
            .sort({ createdAt: -1 });
        return { count, bookings };
    });
    const countBookings = () => __awaiter(void 0, void 0, void 0, function* () { return Booking_1.default.countDocuments(); });
    const totalAdminPayment = () => __awaiter(void 0, void 0, void 0, function* () {
        const graphData = yield Booking_1.default.aggregate([
            {
                $match: {
                    bookingStatus: "Completed",
                    adminPayment: { $exists: true },
                },
            },
            {
                $group: {
                    _id: { month: { $month: "$createdAt" } },
                    profit: { $sum: "$adminPayment" },
                },
            },
            {
                $project: {
                    month: "$_id.month",
                    profit: 1,
                    _id: 0,
                },
            },
        ]);
        const totalProfit = graphData.reduce((acc, curr) => {
            return (acc += curr.profit);
        }, 0);
        return { totalProfit, graphData };
    });
    const getAdminReport = (startDate, endDate) => __awaiter(void 0, void 0, void 0, function* () {
        return yield Booking_1.default.aggregate([
            {
                $match: {
                    bookingStatus: "Completed",
                    adminPayment: {
                        $exists: true,
                    },
                    createdAt: {
                        $gte: new Date(startDate),
                        $lte: new Date(endDate),
                    },
                },
            },
            {
                $lookup: {
                    from: "restaurants",
                    localField: "restaurantId",
                    foreignField: "_id",
                    as: "restaurant",
                },
            },
            {
                $unwind: {
                    path: "$restaurant",
                },
            },
            {
                $project: {
                    _id: 1,
                    restaurant: 1,
                    adminPayment: 1,
                    createdAt: 1,
                },
            },
        ]);
    });
    const getRestaurantReport = (filter) => __awaiter(void 0, void 0, void 0, function* () {
        return yield Booking_1.default.aggregate([
            {
                $match: filter,
            },
            {
                $lookup: {
                    from: "tables",
                    localField: "tableId",
                    foreignField: "_id",
                    as: "table",
                },
            },
            {
                $unwind: {
                    path: "$table",
                },
            },
            {
                $lookup: {
                    from: "tableslots",
                    localField: "tableSlotId",
                    foreignField: "_id",
                    as: "tableSlot",
                },
            },
            {
                $unwind: {
                    path: "$tableSlot",
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user",
                },
            },
            {
                $unwind: {
                    path: "$user",
                },
            },
            {
                $project: {
                    _id: 1,
                    tableSlot: 1,
                    table: 1,
                    user: 1,
                    paymentMethod: 1,
                    paymentStatus: 1,
                    bookingStatus: 1,
                    totalAmount: 1,
                    bookingId: 1,
                    createdAt: 1,
                },
            },
        ]);
    });
    const restaurantGraphData = (restaurantId) => __awaiter(void 0, void 0, void 0, function* () {
        const graphData = yield Booking_1.default.aggregate([
            {
                $match: {
                    restaurantId: new mongoose_1.Types.ObjectId(restaurantId),
                },
            },
            {
                $group: {
                    _id: { month: { $month: "$createdAt" } },
                    profit: { $sum: "$totalAmount" },
                },
            },
            {
                $project: {
                    month: "$_id.month",
                    profit: 1,
                    _id: 0,
                },
            },
        ]);
        const bookingStatistics = yield Booking_1.default.aggregate([
            {
                $match: {
                    restaurantId: new mongoose_1.Types.ObjectId(restaurantId),
                },
            },
            {
                $group: {
                    _id: "$bookingStatus",
                    count: {
                        $sum: 1,
                    },
                },
            },
            {
                $project: {
                    bookingStatus: "$_id",
                    _id: 0,
                    count: 1,
                },
            },
        ]);
        return { graphData, bookingStatistics };
    });
    const createPreorderedFood = (bookingId, predorderData) => __awaiter(void 0, void 0, void 0, function* () {
        const { _id, price, quantity } = predorderData;
        return yield Preorder_1.default.create({ bookingId, itemId: _id, price, quantity });
    });
    const getOrderItem = (filter) => __awaiter(void 0, void 0, void 0, function* () { return yield Preorder_1.default.findOne(filter); });
    const deletOrderItem = (filter) => __awaiter(void 0, void 0, void 0, function* () { return yield Preorder_1.default.deleteOne(filter); });
    const getPreOrder = (bookingId) => __awaiter(void 0, void 0, void 0, function* () { return yield Preorder_1.default.find({ bookingId }).populate("itemId"); });
    const updatePreOrderItem = (filter, updateData) => __awaiter(void 0, void 0, void 0, function* () { return yield Preorder_1.default.findOneAndUpdate(filter, updateData); });
    return {
        createBooking,
        getBookingById,
        updateBooking,
        bookings,
        updateAdminPayment,
        countBookings,
        paginatedBookings,
        totalAdminPayment,
        createPreorderedFood,
        getPreOrder,
        updatePreOrderItem,
        getOrderItem,
        deletOrderItem,
        getAdminReport,
        getRestaurantReport,
        restaurantGraphData,
    };
};
exports.bookingRepositoryMongodb = bookingRepositoryMongodb;
