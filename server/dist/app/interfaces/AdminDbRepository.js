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
function adminDbRepository(repository) {
    const banners = (filter = {}) => __awaiter(this, void 0, void 0, function* () { return yield repository.banners(filter); });
    const newBanner = (bannerData) => __awaiter(this, void 0, void 0, function* () { return yield repository.newBanner(bannerData); });
    const updateBanner = (bannerId, isActive) => __awaiter(this, void 0, void 0, function* () { return yield repository.updateBanner(bannerId, isActive); });
    const deleteBanner = (bannerId) => __awaiter(this, void 0, void 0, function* () { return yield repository.deleteBanner(bannerId); });
    return { banners, newBanner, updateBanner, deleteBanner };
}
exports.default = adminDbRepository;
