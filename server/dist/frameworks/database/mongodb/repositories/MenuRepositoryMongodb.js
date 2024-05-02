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
exports.MenuRepositoryMongodb = void 0;
const menu_1 = __importDefault(require("../models/menu"));
const MenuRepositoryMongodb = () => {
    const addMenu = (menuData) => __awaiter(void 0, void 0, void 0, function* () {
        return yield menu_1.default.create({
            name: menuData.getName(),
            category: menuData.getCategory(),
            image: menuData.getImage(),
            price: menuData.getPrice(),
            isVegetarian: menuData.isVegetarian(),
            restaurantId: menuData.getRestaurantId(),
            tags: menuData.getTags(),
        });
    });
    const isItemExists = (restaurantId, name) => __awaiter(void 0, void 0, void 0, function* () { return yield menu_1.default.findOne({ name, restaurantId }); });
    const updateMenuItem = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () { return yield menu_1.default.findByIdAndUpdate(id, updateData, { new: true }); });
    const deleteItem = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield menu_1.default.findByIdAndDelete(id); });
    const getMenu = (filter, limit, skip) => __awaiter(void 0, void 0, void 0, function* () { return yield menu_1.default.find(filter).limit(limit).skip(skip); });
    return {
        addMenu,
        isItemExists,
        updateMenuItem,
        deleteItem,
        getMenu,
    };
};
exports.MenuRepositoryMongodb = MenuRepositoryMongodb;
