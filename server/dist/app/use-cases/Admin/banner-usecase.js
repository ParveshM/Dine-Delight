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
exports.removBannerImage = exports.updateActiveBanners = exports.addBanner = exports.getAllBanners = void 0;
const getAllBanners = (filter, adminRepository) => __awaiter(void 0, void 0, void 0, function* () { return yield adminRepository.banners(filter); });
exports.getAllBanners = getAllBanners;
const addBanner = (bannerData, adminRepository) => __awaiter(void 0, void 0, void 0, function* () { return yield adminRepository.newBanner(bannerData); });
exports.addBanner = addBanner;
const updateActiveBanners = (bannerId, isActive, adminRepository) => __awaiter(void 0, void 0, void 0, function* () { return yield adminRepository.updateBanner(bannerId, isActive); });
exports.updateActiveBanners = updateActiveBanners;
const removBannerImage = (bannerId, adminRepository) => __awaiter(void 0, void 0, void 0, function* () { return yield adminRepository.deleteBanner(bannerId); });
exports.removBannerImage = removBannerImage;
