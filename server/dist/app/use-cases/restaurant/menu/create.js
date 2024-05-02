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
exports.addItemToMenu = void 0;
const menuEntity_1 = __importDefault(require("../../../../entities/menuEntity"));
const httpStatus_1 = require("../../../../types/httpStatus");
const customError_1 = __importDefault(require("../../../../utils/customError"));
const addItemToMenu = (restaurantId, item, menuRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, category, isVegetarian, tags, image } = item;
    const isItemInMenu = yield menuRepository.isItemExists(restaurantId, name);
    if (isItemInMenu)
        throw new customError_1.default("Item already exists on menu", httpStatus_1.HttpStatus.BAD_REQUEST);
    const newMenuItem = (0, menuEntity_1.default)(name, price, image, category, isVegetarian, restaurantId, tags);
    return yield menuRepository.createMenu(newMenuItem);
});
exports.addItemToMenu = addItemToMenu;
