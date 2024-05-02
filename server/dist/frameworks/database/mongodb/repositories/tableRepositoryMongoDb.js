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
exports.tableRepositoryMongodb = void 0;
const tables_1 = __importDefault(require("../models/tables"));
const tableRepositoryMongodb = () => {
    const addTable = (tableData) => __awaiter(void 0, void 0, void 0, function* () {
        return yield tables_1.default.create({
            tableNumber: tableData.getTableNumber(),
            restaurantId: tableData.getRestaurantId(),
            capacity: tableData.getCapacity(),
            location: tableData.getLocation(),
        });
    });
    const getTablebyId = (tableId) => __awaiter(void 0, void 0, void 0, function* () { return yield tables_1.default.findById(tableId).populate("restaurantId"); });
    const getTablebyNumber = (tableNumber, restaurantId) => __awaiter(void 0, void 0, void 0, function* () { return yield tables_1.default.findOne({ tableNumber, restaurantId }); });
    const getAllTables = (filter, Paginate) => __awaiter(void 0, void 0, void 0, function* () {
        const tables = yield tables_1.default.find(filter)
            .skip(Paginate.skip)
            .limit(Paginate.limit);
        const count = yield tables_1.default.countDocuments(filter);
        return { tables, count };
    });
    return {
        addTable,
        getTablebyId,
        getAllTables,
        getTablebyNumber,
    };
};
exports.tableRepositoryMongodb = tableRepositoryMongodb;
