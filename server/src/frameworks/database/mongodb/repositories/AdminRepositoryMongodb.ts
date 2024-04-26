import { BannerInterface } from "../../../../types/adminInterfaces";
import Banner from "../models/Banner";

export const adminRepositoryMongodb = () => {
  const banners = async (filter: Record<string, any> = {}) =>
    await Banner.find(filter);

  const newBanner = async (bannerData: BannerInterface) =>
    await Banner.create(bannerData);

  const updateBanner = async (bannerId: string, isActive: string) =>
    await Banner.findOneAndUpdate({ _id: bannerId }, { isActive });

  const deleteBanner = async (bannerId: string) =>
    await Banner.findByIdAndDelete(bannerId);

  return { banners, newBanner, updateBanner, deleteBanner };
};

export type AdminRepositoryMongodbType = typeof adminRepositoryMongodb;
