import { MenuItemInterface } from "../../../../types/restaurantInterface";
import { MenuDbRepositoryInterface } from "../../../interfaces/menuDbRepository";

export const getMenuByRestaurant = async (
  restaurantID: string,
  limit: number,
  skip: number,
  menuRepository: ReturnType<MenuDbRepositoryInterface>
) => await menuRepository.getMenu({ restaurantId: restaurantID }, limit, skip);
