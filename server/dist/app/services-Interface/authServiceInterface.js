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
exports.authServiceInterface = void 0;
// Auth service interface to see the availbale services in auth
const authServiceInterface = (service) => {
    const encryptpassword = (password) => __awaiter(void 0, void 0, void 0, function* () { return service.encryptPassword(password); });
    const comparePassword = (inputPassword, password) => __awaiter(void 0, void 0, void 0, function* () { return service.comparePassword(inputPassword, password); });
    const generateOTP = () => service.generateOTP();
    const getRandomString = () => service.getRandomString();
    const createTokens = (id, name, role) => service.createTokens(id, name, role);
    return {
        encryptpassword,
        comparePassword,
        generateOTP,
        getRandomString,
        createTokens,
    };
};
exports.authServiceInterface = authServiceInterface;
