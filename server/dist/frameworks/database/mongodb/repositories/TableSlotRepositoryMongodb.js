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
exports.TableSlotRepositoryMongodb = void 0;
const Tableslots_1 = __importDefault(require("../models/Tableslots"));
const mongoose_1 = __importDefault(require("mongoose"));
const TableSlotRepositoryMongodb = () => {
    const addNewTableSlot = (slotData) => __awaiter(void 0, void 0, void 0, function* () {
        return yield Tableslots_1.default.create({
            tableId: slotData.getTableId(),
            slotDate: slotData.getslotDate(),
            startTime: slotData.getStartTime(),
            endTime: slotData.getEndTime(),
        });
    });
    const getTableSlotbyId = (filter, paginate) => __awaiter(void 0, void 0, void 0, function* () {
        const tableSlot = yield Tableslots_1.default.find(filter)
            .sort({ slotDate: 1 })
            .skip(paginate.skip)
            .limit(paginate.limit);
        const count = yield Tableslots_1.default.countDocuments(filter);
        return { tableSlot, count };
    });
    const isSlotAvailable = (tableId, slotDate, startTime, endTime) => __awaiter(void 0, void 0, void 0, function* () { return yield Tableslots_1.default.findOne({ tableId, slotDate, startTime, endTime }); });
    const updateSlot = (id, updatingData) => __awaiter(void 0, void 0, void 0, function* () { return yield Tableslots_1.default.findByIdAndUpdate(id, updatingData); });
    const removeTableSlotById = (tableId) => __awaiter(void 0, void 0, void 0, function* () { return yield Tableslots_1.default.findByIdAndDelete(tableId); });
    const getAvailableTableSlotsByFilter = (restaurantID, capacity, startTime, //type '$startTime' that is matched by whole dataset startTime else the given time
    currentDate, endDate) => __awaiter(void 0, void 0, void 0, function* () {
        const startOfDay = new Date(currentDate);
        startOfDay.setHours(0, 0, 0);
        const endOfDay = new Date(currentDate);
        endOfDay.setHours(23, 59, 59);
        const objectIdRestaurantID = new mongoose_1.default.Types.ObjectId(restaurantID);
        const matchStage = {
            "tableInfo.restaurantId": objectIdRestaurantID,
            "tableInfo.capacity": capacity,
            isAvailable: true,
            slotDate: { $gte: startOfDay },
        };
        if (endDate) {
            const endOfDay = new Date(endDate);
            endOfDay.setHours(23, 59, 59);
            matchStage.slotDate.$lt = endOfDay;
        }
        return yield Tableslots_1.default.aggregate([
            {
                $lookup: {
                    from: "tables",
                    localField: "tableId",
                    foreignField: "_id",
                    as: "tableInfo",
                },
            },
            {
                $match: matchStage,
            },
            {
                $project: {
                    startTime: { $trim: { input: startTime } },
                    tableId: 1,
                    slotDate: 1,
                    endTime: 1,
                    isAvailable: 1,
                },
            },
            {
                $group: {
                    _id: "$startTime",
                    slot: { $first: "$$ROOT" },
                    originalId: { $first: "$_id" },
                },
            },
            {
                $sort: {
                    _id: -1,
                },
            },
            {
                $project: {
                    startTime: "$_id",
                    tableId: "$slot.tableId",
                    slotDate: "$slot.slotDate",
                    endTime: "$slot.endTime",
                    isAvailable: "$slot.isAvailable",
                    tableInfo: "$slot.tableInfo",
                    _id: "$originalId",
                },
            },
        ]);
    });
    return {
        addNewTableSlot,
        getTableSlotbyId,
        isSlotAvailable,
        updateSlot,
        removeTableSlotById,
        getAvailableTableSlotsByFilter,
    };
};
exports.TableSlotRepositoryMongodb = TableSlotRepositoryMongodb;
