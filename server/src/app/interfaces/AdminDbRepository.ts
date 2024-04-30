import { AdminRepositoryMongodbType } from "../../frameworks/database/mongodb/repositories/AdminRepositoryMongodb";
import { BannerInterface } from "../../types/adminInterfaces";

export default function adminDbRepository(
  repository: ReturnType<AdminRepositoryMongodbType>
) {
  const banners = async (filter: Record<string, any> = {}) =>
    await repository.banners(filter);

  const newBanner = async (bannerData: BannerInterface) =>
    await repository.newBanner(bannerData);

  const updateBanner = async (bannerId: string, isActive: string) =>
    await repository.updateBanner(bannerId, isActive);

  const deleteBanner = async (bannerId: string) =>
    await repository.deleteBanner(bannerId);

  return { banners, newBanner, updateBanner, deleteBanner };
}
export type AdminDbRepositoryInterface = typeof adminDbRepository;
