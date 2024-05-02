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
exports.TableSlotDbRepository = void 0;
const TableSlotDbRepository = (repository) => {
    const addNewTableSlot = (reserveTableData) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.addNewTableSlot(reserveTableData); });
    const getTablSlotebyId = (filter, paginate) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getTableSlotbyId(filter, paginate); });
    const isSlotAvailable = ({ tableId, slotDate, startTime, endTime, }) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.isSlotAvailable(tableId, slotDate, startTime, endTime); });
    const updateSlot = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.updateSlot(id, updateData); });
    const removeTablSlotebyId = (tableID) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.removeTableSlotById(tableID); });
    const getAvailableTableSlotsByFilter = (restaurantID, capacity, startTime, currentDate, endDate) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.getAvailableTableSlotsByFilter(restaurantID, capacity, startTime, currentDate, endDate);
    });
    return {
        addNewTableSlot,
        getTablSlotebyId,
        isSlotAvailable,
        updateSlot,
        removeTablSlotebyId,
        getAvailableTableSlotsByFilter,
    };
};
exports.TableSlotDbRepository = TableSlotDbRepository;
