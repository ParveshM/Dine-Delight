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
exports.getReviewsByUserId = exports.getBookingByBookingId = exports.getBookings = exports.updateBookingStatus = exports.createPayment = exports.reserveATable = void 0;
const stripe_1 = __importDefault(require("stripe"));
const bookingEntity_1 = __importDefault(require("../../../../entities/bookingEntity"));
const config_1 = __importDefault(require("../../../../config"));
const updateWallet_1 = require("./updateWallet");
const customError_1 = __importDefault(require("../../../../utils/customError"));
const httpStatus_1 = require("../../../../types/httpStatus");
const mongoose_1 = require("mongoose");
const reserveATable = (reservationData, userId, reservationService, bookingDbRepository, restaurantDbRepository, tableDbRepository, tablSlotDbRepository, userRepository) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { restaurantId, tableId, tableSlotId, paymentMethod } = reservationData;
    console.log(reservationData);
    const restaurantDetails = yield restaurantDbRepository.getRestaurantById(restaurantId);
    const tableDetails = yield tableDbRepository.getTablebyId(tableId);
    // calculate subTotal , gst and totalAmount
    let subTotal, gstAmount = 0, totalAmount = 0;
    if (restaurantDetails && tableDetails) {
        subTotal =
            (tableDetails === null || tableDetails === void 0 ? void 0 : tableDetails.capacity) * ((_a = restaurantDetails.tableRatePerPerson) !== null && _a !== void 0 ? _a : 0);
        const { gstAmount: calculatedGst, totalAmount: calculatedTotal } = reservationService.calculateGSTAmount(subTotal);
        gstAmount = calculatedGst;
        totalAmount = calculatedTotal;
    }
    const newReservation = (0, bookingEntity_1.default)(userId, restaurantId, tableId, tableSlotId, paymentMethod, gstAmount, totalAmount);
    if (paymentMethod === "Wallet") {
        const wallet = yield userRepository.getWalletByUseId(userId);
        if (wallet) {
            if (wallet.balance >= totalAmount) {
                const transactionData = {
                    newBalance: totalAmount,
                    type: "Debit",
                    description: "Booking transaction",
                };
                yield (0, updateWallet_1.updateWallet)(userId, transactionData, userRepository);
            }
            else {
                throw new customError_1.default("Insufficient wallet balance", httpStatus_1.HttpStatus.BAD_REQUEST);
            }
        }
    }
    const booking = yield bookingDbRepository.createBooking(newReservation);
    const updateSlot = yield tablSlotDbRepository.updateSlot(tableSlotId, {
        isAvailable: false,
    });
    return booking;
});
exports.reserveATable = reserveATable;
const createPayment = (userName = "John Doe", email = "johndoe@gmail.com", bookingId, totalAmount) => __awaiter(void 0, void 0, void 0, function* () {
    const stripe = new stripe_1.default(config_1.default.STRIPE_SECRET_KEY);
    const customer = yield stripe.customers.create({
        name: userName,
        email: email,
        address: {
            line1: "Los Angeles, LA",
            country: "US",
        },
    });
    const session = yield stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        customer: customer.id,
        line_items: [
            {
                price_data: {
                    currency: "inr",
                    product_data: { name: "Guests", description: "Table booking" },
                    unit_amount: Math.round(totalAmount * 100),
                },
                quantity: 1,
            },
        ],
        mode: "payment",
        success_url: `${config_1.default.CLIENT_PORT}/payment_status/${bookingId}?success=true`,
        cancel_url: `${config_1.default.CLIENT_PORT}/payment_status/${bookingId}?success=false`,
    });
    return session.id;
});
exports.createPayment = createPayment;
const updateBookingStatus = (id, paymentStatus, bookingRepository, tableSlotRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingStatus = paymentStatus === "Paid" ? "Confirmed" : "Pending";
    const updationData = {
        paymentStatus,
        bookingStatus,
    };
    const bookingData = yield bookingRepository.updateBookingDetails(id, updationData);
    const tableSlotId = bookingData === null || bookingData === void 0 ? void 0 : bookingData.tableSlotId;
    if (paymentStatus === "Failed") {
        yield tableSlotRepository.updateSlot(tableSlotId, {
            paymentStatus: "Failed",
            isAvailable: true,
        });
    }
    return bookingData;
});
exports.updateBookingStatus = updateBookingStatus;
const getBookings = (userID, bookingRepository) => __awaiter(void 0, void 0, void 0, function* () { return yield bookingRepository.bookings({ userId: new mongoose_1.Types.ObjectId(userID) }); });
exports.getBookings = getBookings;
const getBookingByBookingId = (bookingID, bookingRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingDetails = yield bookingRepository.getBookingById(bookingID);
    const preOrder = yield bookingRepository.getPreoOrderbyBookingId(bookingID);
    return { bookingDetails, preOrder };
});
exports.getBookingByBookingId = getBookingByBookingId;
const getReviewsByUserId = (userID, restaurantID, restaurantRepository) => __awaiter(void 0, void 0, void 0, function* () {
    return yield restaurantRepository.getRatings({
        userId: userID,
        restaurantId: restaurantID,
    });
});
exports.getReviewsByUserId = getReviewsByUserId;
