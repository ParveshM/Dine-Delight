import { MenuEntityType } from "../../entities/menuEntity";
import { MenuRepositoryMongodbType } from "../../frameworks/database/mongodb/repositories/MenuRepositoryMongodb";
import { MenuItemInterface } from "../../types/restaurantInterface";

export const menuDbRepository = (
  repository: ReturnType<MenuRepositoryMongodbType>
) => {
  const createMenu = async (menuData: MenuEntityType) =>
    await repository.addMenu(menuData);

  const isItemExists = async (restaurantId: string, name: string) =>
    await repository.isItemExists(restaurantId, name);

  const updateMenuItem = async (id: string, updateData: MenuItemInterface) =>
    await repository.updateMenuItem(id, updateData);

  const deleteMenuItem = async (id: string) => await repository.deleteItem(id);

  const getMenu = async (
    filter: Record<string, any>,
    limit: number,
    skip: number
  ) => await repository.getMenu(filter, limit, skip);

  return { createMenu, isItemExists, updateMenuItem, deleteMenuItem, getMenu };
};

export type MenuDbRepositoryInterface = typeof menuDbRepository;
