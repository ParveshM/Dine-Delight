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
exports.menuDbRepository = void 0;
const menuDbRepository = (repository) => {
    const createMenu = (menuData) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.addMenu(menuData); });
    const isItemExists = (restaurantId, name) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.isItemExists(restaurantId, name); });
    const updateMenuItem = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.updateMenuItem(id, updateData); });
    const deleteMenuItem = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.deleteItem(id); });
    const getMenu = (filter, limit, skip) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getMenu(filter, limit, skip); });
    return {
        createMenu,
        isItemExists,
        updateMenuItem,
        deleteMenuItem,
        getMenu,
    };
};
exports.menuDbRepository = menuDbRepository;
