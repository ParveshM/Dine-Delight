"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function reserveSlotEntity(tableId, slotDate, startTime, endTime) {
    return {
        getTableId: () => tableId,
        getslotDate: () => slotDate,
        getStartTime: () => startTime,
        getEndTime: () => endTime,
    };
}
exports.default = reserveSlotEntity;
