import { MenuItemInterface } from "../../../../types/restaurantInterface";
import { MenuDbRepositoryInterface } from "../../../interfaces/menuDbRepository";

export const updateMenuItem = async (
  itemId: string,
  updateItemData: MenuItemInterface,
  menuRepository: ReturnType<MenuDbRepositoryInterface>
) => await menuRepository.updateMenuItem(itemId, updateItemData);

export const removeMenuItem = async (
  itemId: string,
  menuRepository: ReturnType<MenuDbRepositoryInterface>
) => await menuRepository.deleteMenuItem(itemId);
