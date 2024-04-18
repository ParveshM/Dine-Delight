import { MenuEntityType } from "../../../../entities/menuEntity";
import { MenuItemInterface } from "../../../../types/restaurantInterface";
import Menu from "../models/menu";

export const MenuRepositoryMongodb = () => {
  const addMenu = async (menuData: MenuEntityType) =>
    await Menu.create({
      name: menuData.getName(),
      category: menuData.getCategory(),
      price: menuData.getPrice(),
      isVegetarian: menuData.isVegetarian(),
      restaurantId: menuData.getRestaurantId(),
      tags: menuData.getTags(),
    });

  const isItemExists = async (restaurantId: string, name: string) =>
    await Menu.findOne({ name, restaurantId });

  const updateMenuItem = async (id: string, updateData: MenuItemInterface) =>
    await Menu.findByIdAndUpdate(id, updateData, { new: true });

  const deleteItem = async (id: string) => await Menu.findByIdAndDelete(id);

  const getMenu = async (
    filter: Record<string, any>,
    limit: number,
    skip: number
  ) => await Menu.find(filter).limit(limit).skip(skip);

  return { addMenu, isItemExists, updateMenuItem, deleteItem, getMenu };
};

export type MenuRepositoryMongodbType = typeof MenuRepositoryMongodb;
