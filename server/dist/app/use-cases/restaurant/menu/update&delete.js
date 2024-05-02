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
exports.removeMenuItem = exports.updateMenuItem = void 0;
const updateMenuItem = (itemId, updateItemData, menuRepository) => __awaiter(void 0, void 0, void 0, function* () { return yield menuRepository.updateMenuItem(itemId, updateItemData); });
exports.updateMenuItem = updateMenuItem;
const removeMenuItem = (itemId, menuRepository) => __awaiter(void 0, void 0, void 0, function* () { return yield menuRepository.deleteMenuItem(itemId); });
exports.removeMenuItem = removeMenuItem;
