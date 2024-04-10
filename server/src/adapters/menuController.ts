import { Request, Response, NextFunction } from "express";
import { MenuDbRepositoryInterface } from "../app/interfaces/menuDbRepository";
import { MenuRepositoryMongodbType } from "../frameworks/database/mongodb/repositories/MenuRepositoryMongodb";
import { HttpStatus } from "../types/httpStatus";
import { addItemToMenu } from "../app/use-cases/restaurant/menu/create";
import {
  removeMenuItem,
  updateMenuItem,
} from "../app/use-cases/restaurant/menu/update&delete";
import { getMenuByRestaurant } from "../app/use-cases/restaurant/menu/read";
import { BookingDbRepositoryInterface } from "../app/interfaces/bookingDbRepository";
import { BookingRepositoryMongodbType } from "../frameworks/database/mongodb/repositories/BookingRepositoryMongodb";

const menuController = (
  menuDbRepository: MenuDbRepositoryInterface,
  menuDbRepositoryImpl: MenuRepositoryMongodbType,
  bookingDbRepository?: BookingDbRepositoryInterface,
  bookingDbRepositoryImpl?: BookingRepositoryMongodbType
) => {
  const menuRepository = menuDbRepository(menuDbRepositoryImpl());
  let bookingRepository =
    bookingDbRepository &&
    bookingDbRepositoryImpl &&
    bookingDbRepository(bookingDbRepositoryImpl());

  /*
   * METHOD:POST
   * Add menuitem to the Db
   */
  const addMenuItem = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const restaurantId = req.seller;
      const menuItem = await addItemToMenu(
        restaurantId,
        req.body,
        menuRepository
      );
      res
        .status(HttpStatus.OK)
        .json({ success: true, menuItem, message: "Item added successfully" });
    } catch (error) {
      next(error);
    }
  };
  /*
   * METHOD: PUT
   * Update menu item in the Db
   */
  const editMenuItem = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { menuItemID } = req.params;
      const updatedMenuItem = await updateMenuItem(
        menuItemID,
        req.body,
        menuRepository
      );
      res.status(HttpStatus.OK).json({
        success: true,
        menuItem: updatedMenuItem,
        message: "Item updated successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  /*
   * METHOD: DELETE
   * Delete menu item from the Db
   */
  const deleteMenuItem = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { menuItemID } = req.params;
      await removeMenuItem(menuItemID, menuRepository);
      res
        .status(HttpStatus.OK)
        .json({ success: true, message: "Item deleted successfully" });
    } catch (error) {
      next(error);
    }
  };

  /*
   * METHOD: GET
   * Get  menu for the restaurant
   */
  const getMenu = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let restaurantId = req.seller;
      const page = parseInt(req.query.page as string, 10) || 1;
      const q = req.query.q as string;
      const isVegetarian = req.query.isVegetarian;
      const category = req.query.category;

      if (req.params.bookingID) {
        const booking = await bookingRepository?.getBookingById(
          req.params.bookingID
        );
        restaurantId = booking?.restaurantId;
      }

      const filters: Record<string, any> = {
        restaurantId,
      };
      if (q) filters.name = new RegExp(q ?? "", "i");
      if (isVegetarian) filters.isVegetarian = isVegetarian;
      if (category) filters.category = category;
      const limit = 10;
      const skip = (page - 1) * limit;
      const menu = await getMenuByRestaurant(
        filters,
        limit,
        skip,
        menuRepository
      );
      res
        .status(HttpStatus.OK)
        .json({ success: true, message: "Menu fetched successfully", menu });
    } catch (error) {
      next(error);
    }
  };

  return { getMenu, addMenuItem, editMenuItem, deleteMenuItem };
};
export default menuController;
