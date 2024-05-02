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
exports.timeSlotDbRepository = void 0;
const timeSlotDbRepository = (repository) => {
    const addTimeSlot = (timeslotData) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.addTimeSlots(timeslotData); });
    const isTimeSlotExist = (restaurantId, startTime, endTime) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getSlotByTime(restaurantId, startTime, endTime); });
    const getAllTimeSlots = (restaurantId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getAllTimeSlots(restaurantId); });
    const removeTimeSlotbyId = (timeSlotId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.removeTimeSlotbyId(timeSlotId); });
    return {
        addTimeSlot,
        isTimeSlotExist,
        getAllTimeSlots,
        removeTimeSlotbyId,
    };
};
exports.timeSlotDbRepository = timeSlotDbRepository;
