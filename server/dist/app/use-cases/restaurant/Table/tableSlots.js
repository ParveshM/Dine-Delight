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
exports.removeTableSlot = exports.getTableSlots = exports.addTableslotAndTime = void 0;
const reserveSlotEntity_1 = __importDefault(require("../../../../entities/reserveSlotEntity"));
const httpStatus_1 = require("../../../../types/httpStatus");
const customError_1 = __importDefault(require("../../../../utils/customError"));
const addTableslotAndTime = (reserveTableData, tableSlotRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const isSlotExisting = yield tableSlotRepository.isSlotAvailable(reserveTableData);
    if (isSlotExisting)
        throw new customError_1.default("slot already alotted for this date and time", httpStatus_1.HttpStatus.BAD_REQUEST);
    const { tableId, slotDate, startTime, endTime } = reserveTableData;
    const newTablSlot = (0, reserveSlotEntity_1.default)(tableId, new Date(slotDate), startTime, endTime);
    return yield tableSlotRepository.addNewTableSlot(newTablSlot);
});
exports.addTableslotAndTime = addTableslotAndTime;
const getTableSlots = (tableId, filterQuery, paginate, tableSlotRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = {
        tableId,
    };
    if (filterQuery.slotDate) {
        filter.slotDate = { $gte: filterQuery.slotDate };
    }
    if (filterQuery.startTime) {
        filter.startTime = { $eq: filterQuery.startTime };
    }
    return yield tableSlotRepository.getTablSlotebyId(filter, paginate);
});
exports.getTableSlots = getTableSlots;
const removeTableSlot = (tableID, tableSlotRepository) => __awaiter(void 0, void 0, void 0, function* () { return yield tableSlotRepository.removeTablSlotebyId(tableID); });
exports.removeTableSlot = removeTableSlot;
