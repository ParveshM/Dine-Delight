"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authServiceInterface_1 = require("../../../app/services-Interface/authServiceInterface");
const authService_1 = require("../../services/authService");
const tokenController_1 = __importDefault(require("../../../adapters/tokenController"));
const userDbRepository_1 = require("../../../app/interfaces/userDbRepository");
const restaurantDbRepository_1 = require("../../../app/interfaces/restaurantDbRepository");
const restaurantRepositoryMongodb_1 = require("../../database/mongodb/repositories/restaurantRepositoryMongodb");
const userRepositoryMongodb_1 = require("../../database/mongodb/repositories/userRepositoryMongodb");
const refreshTokenRoute = () => {
    const router = express_1.default.Router();
    const controller = (0, tokenController_1.default)(authServiceInterface_1.authServiceInterface, authService_1.authService, userDbRepository_1.userDbRepository, userRepositoryMongodb_1.userRepositoryMongodb, restaurantDbRepository_1.restaurantDbRepository, restaurantRepositoryMongodb_1.restaurantRepositoryMongodb);
    router.get("/accessToken", controller.returnAccessToClient);
    router.post("/refresh_token", controller.getNewAccessToken);
    return router;
};
exports.default = refreshTokenRoute;
