import { MenuItemInterface } from "../../../../types/restaurantInterface";
import { MenuDbRepositoryInterface } from "../../../interfaces/menuDbRepository";

export const getMenuByRestaurant = async (
  filters: Record<string, any>,
  limit: number,
  skip: number,
  menuRepository: ReturnType<MenuDbRepositoryInterface>
) => await menuRepository.getMenu(filters, limit, skip);
