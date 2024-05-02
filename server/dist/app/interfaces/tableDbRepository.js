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
exports.tableDbRepository = void 0;
const tableDbRepository = (repository) => {
    const addTable = (tableData) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.addTable(tableData); });
    const getTablebyId = (tableId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getTablebyId(tableId); });
    const getTablebyNumber = (tableNumber, restaurantId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getTablebyNumber(tableNumber, restaurantId); });
    const getAllTables = (filter, paginate) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getAllTables(filter, paginate); });
    return { addTable, getTablebyId, getTablebyNumber, getAllTables };
};
exports.tableDbRepository = tableDbRepository;
