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
const tables_1 = require("../app/use-cases/restaurant/Table/tables");
const httpStatus_1 = require("../types/httpStatus");
const tableSlots_1 = require("../app/use-cases/restaurant/Table/tableSlots");
const timeSlot_1 = require("../app/use-cases/restaurant/Table/timeSlot");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const tableController = (tableDbRepository, tableDbRepositoryImpl, reserveTableDbRepository, reserveTableDbRepositoryImpl, timeSlotDbRepository, timeSlotDbRepositoryImpl) => {
    const dbTableRepository = tableDbRepository(tableDbRepositoryImpl());
    const dbTableSlotsRepository = reserveTableDbRepository(reserveTableDbRepositoryImpl());
    const dbTimeSlotRepository = timeSlotDbRepository(timeSlotDbRepositoryImpl());
    /*
     * * METHOD :POST
     * Add new table to database
     */
    const addTable = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const restaurantId = req.seller;
            const newTable = yield (0, tables_1.addNewTable)(req.body, restaurantId, dbTableRepository);
            return res.status(httpStatus_1.HttpStatus.OK).json({
                success: true,
                message: "Table created successfully",
                newTable,
            });
        }
        catch (error) {
            next(error);
        }
    });
    /*
     * * METHOD :POST
     * Allot slots for tables
     */
    const allotTableSlots = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newSlot = yield (0, tableSlots_1.addTableslotAndTime)(req.body, dbTableSlotsRepository);
            if (newSlot) {
                return res.status(httpStatus_1.HttpStatus.OK).json({
                    success: true,
                    message: "Time slot addedd successfully",
                    newSlot,
                });
            }
        }
        catch (error) {
            next(error);
        }
    });
    /*
     * * METHOD :DELETE
     * Delete Table slot by id
     */
    const deleteTableSlot = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { tableID } = req.params;
            yield (0, tableSlots_1.removeTableSlot)(tableID, dbTableSlotsRepository);
            return res.status(httpStatus_1.HttpStatus.OK).json({
                success: true,
                message: "slot removed successfully",
            });
        }
        catch (error) {
            next(error);
        }
    });
    /*
     * * METHOD :GET
     * Get all the tables for the restaurant
     */
    const getAllTable = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const restaurantID = req.seller;
            const page = (_a = parseInt(req.query.page)) !== null && _a !== void 0 ? _a : 1;
            const limit = 5;
            const skip = (page - 1) * limit;
            const { tables, count } = yield (0, tables_1.getTableList)(restaurantID, skip, limit, dbTableRepository);
            res.status(httpStatus_1.HttpStatus.OK).json({
                success: true,
                tables,
                count,
                skip,
                limit,
                message: "Tables fetched successfully",
            });
        }
        catch (error) {
            throw new Error("Error in fetching tables");
        }
    }));
    /*
     * * METHOD :GET
     * Get all the table Slots by tableID
     * @param tableID
     */
    const getAllTableSlots = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        try {
            const { tableID } = req.params;
            const page = (_b = parseInt(req.query.page)) !== null && _b !== void 0 ? _b : 1;
            const { date, time } = req.query;
            const limit = 10;
            const skip = (page - 1) * limit;
            const filterQuery = {};
            if (date)
                filterQuery.slotDate = date;
            if (time)
                filterQuery.startTime = time;
            const paginate = { skip, limit };
            const { tableSlot, count } = yield (0, tableSlots_1.getTableSlots)(tableID, filterQuery, paginate, dbTableSlotsRepository);
            res.status(httpStatus_1.HttpStatus.OK).json({
                success: true,
                message: "TableSlots fetched successfully",
                tableSlot,
                count,
                limit,
            });
        }
        catch (error) {
            throw new Error("Error in fetching table");
        }
    }));
    /*
     * * METHOD :POST
     * Add new time slots
     */
    const addTimeSlots = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newTimeSlot = yield (0, timeSlot_1.addTimeSlot)(req.body, req.seller, dbTimeSlotRepository);
            res.status(httpStatus_1.HttpStatus.OK).json({
                success: true,
                message: "Time slots added successfully",
                newTimeSlot,
            });
        }
        catch (error) {
            next(error);
        }
    });
    /*
     * * METHOD :GET
     * return all time slot to the restaurant
     */
    const getTimeSlots = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const restaurantId = req.seller;
            const timeSlots = yield (0, timeSlot_1.getTimeSlotsByRestaurantId)(restaurantId, dbTimeSlotRepository);
            res.status(httpStatus_1.HttpStatus.OK).json({ success: true, timeSlots });
        }
        catch (error) {
            next(error);
        }
    });
    /*
     * * METHOD :DELETE
     * Remove time slot from database
     */
    const removeTimeSlot = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { timeSlotId } = req.params;
            yield (0, timeSlot_1.deleteTimeSlot)(timeSlotId, dbTimeSlotRepository);
            res
                .status(httpStatus_1.HttpStatus.OK)
                .json({ success: true, message: "Slot deleted successfully" });
        }
        catch (error) {
            next(error);
        }
    });
    return {
        addTable,
        allotTableSlots,
        getAllTable,
        addTimeSlots,
        getTimeSlots,
        removeTimeSlot,
        getAllTableSlots,
        deleteTableSlot,
    };
};
exports.default = tableController;
