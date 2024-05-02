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
exports.getTableList = exports.addNewTable = void 0;
const tableEntity_1 = __importDefault(require("../../../../entities/tableEntity"));
const httpStatus_1 = require("../../../../types/httpStatus");
const customError_1 = __importDefault(require("../../../../utils/customError"));
const addNewTable = (tableData, restaurantId, tableDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const { tableNumber, capacity, location } = tableData;
    const isTableExist = yield tableDbRepository.getTablebyNumber(tableNumber, restaurantId);
    if (isTableExist)
        throw new customError_1.default("Table name already exists,please use another name", httpStatus_1.HttpStatus.BAD_REQUEST);
    const createNewTable = (0, tableEntity_1.default)(tableNumber, restaurantId, capacity, location);
    return yield tableDbRepository.addTable(createNewTable);
});
exports.addNewTable = addNewTable;
const getTableList = (restaurantID, skip, limit, tableDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    return yield tableDbRepository.getAllTables({ restaurantId: restaurantID }, { skip, limit });
});
exports.getTableList = getTableList;
