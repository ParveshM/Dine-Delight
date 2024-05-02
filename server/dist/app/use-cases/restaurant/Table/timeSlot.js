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
exports.deleteTimeSlot = exports.getTimeSlotsByRestaurantId = exports.addTimeSlot = void 0;
const timeSlotEntity_1 = __importDefault(require("../../../../entities/timeSlotEntity"));
const httpStatus_1 = require("../../../../types/httpStatus");
const customError_1 = __importDefault(require("../../../../utils/customError"));
const addTimeSlot = (timeSlotData, restaurantId, dbTimeSlotRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const { startTime, endTime } = timeSlotData;
    const isTimeSlotExists = yield dbTimeSlotRepository.isTimeSlotExist(restaurantId, startTime, endTime);
    if (isTimeSlotExists)
        throw new customError_1.default("Time slot already exists ", httpStatus_1.HttpStatus.BAD_REQUEST);
    const newSlot = (0, timeSlotEntity_1.default)(restaurantId, startTime, endTime);
    return yield dbTimeSlotRepository.addTimeSlot(newSlot);
});
exports.addTimeSlot = addTimeSlot;
const getTimeSlotsByRestaurantId = (restaurantId, dbTimeSlotRepository) => __awaiter(void 0, void 0, void 0, function* () { return yield dbTimeSlotRepository.getAllTimeSlots(restaurantId); });
exports.getTimeSlotsByRestaurantId = getTimeSlotsByRestaurantId;
const deleteTimeSlot = (timeSlotId, dbTimeSlotRepository) => __awaiter(void 0, void 0, void 0, function* () { return yield dbTimeSlotRepository.removeTimeSlotbyId(timeSlotId); });
exports.deleteTimeSlot = deleteTimeSlot;
