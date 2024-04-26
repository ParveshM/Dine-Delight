import { BannerInterface } from "../../../types/adminInterfaces";
import { AdminDbRepositoryInterface } from "../../interfaces/AdminDbRepository";

export const getAllBanners = async (
  filter: Record<string, any>,
  adminRepository: ReturnType<AdminDbRepositoryInterface>
) => await adminRepository.banners(filter);

export const addBanner = async (
  bannerData: BannerInterface,
  adminRepository: ReturnType<AdminDbRepositoryInterface>
) => await adminRepository.newBanner(bannerData);

export const updateActiveBanners = async (
  bannerId: string,
  isActive: string,
  adminRepository: ReturnType<AdminDbRepositoryInterface>
) => await adminRepository.updateBanner(bannerId, isActive);

export const removBannerImage = async (
  bannerId: string,
  adminRepository: ReturnType<AdminDbRepositoryInterface>
) => await adminRepository.deleteBanner(bannerId);
