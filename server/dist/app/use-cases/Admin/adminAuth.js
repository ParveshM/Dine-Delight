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
exports.loginAdmin = void 0;
const config_1 = __importDefault(require("../../../config"));
const httpStatus_1 = require("../../../types/httpStatus");
const customError_1 = __importDefault(require("../../../utils/customError"));
const loginAdmin = (email, password, authService) => __awaiter(void 0, void 0, void 0, function* () {
    if (email === config_1.default.ADMIN_EMAIL &&
        password === config_1.default.ADMIN_PASSWORD) {
        const { accessToken, refreshToken } = authService.createTokens(email, "Admin_User", "admin");
        return { accessToken, refreshToken };
    }
    throw new customError_1.default("Invalid credentials", httpStatus_1.HttpStatus.UNAUTHORIZED);
});
exports.loginAdmin = loginAdmin;
