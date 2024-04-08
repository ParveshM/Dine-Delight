import menuEntity from "../../../../entities/menuEntity";
import { HttpStatus } from "../../../../types/httpStatus";
import { MenuItemInterface } from "../../../../types/restaurantInterface";
import CustomError from "../../../../utils/customError";
import { MenuDbRepositoryInterface } from "../../../interfaces/menuDbRepository";

export const addItemToMenu = async (
  restaurantId: string,
  item: MenuItemInterface,
  menuRepository: ReturnType<MenuDbRepositoryInterface>
) => {
  const { name, price, category, isVegetarian } = item;

  const isItemInMenu = await menuRepository.isItemExists(restaurantId, name);

  if (isItemInMenu)
    throw new CustomError(
      "Item already exists on menu",
      HttpStatus.BAD_REQUEST
    );

  const newMenuItem = menuEntity(
    name,
    price,
    category,
    isVegetarian,
    restaurantId
  );

  return await menuRepository.createMenu(newMenuItem);
};
