import { PaginateInterface } from "../../../../types/restaurantInterface";
import { OrderInterface } from "../../../../types/userInterface";
import Order from "../models/Order";

export default function OrderRepositoryMongodb() {
  const createOrder = async (orderData: OrderInterface) => {
    const { user, restaurant, orderItems, total, mobile, tableNumber } =
      orderData;
    const newOrder = await Order.create({
      user,
      restaurant,
      orderItems,
      total,
      mobile,
      tableNumber,
    });
    return newOrder;
  };
  const getOrderById = async (orderId: string) => Order.findOne({ orderId });
  const allOrders = async (
    filter: Record<string, any>,
    paginate: PaginateInterface
  ) => {
    const orders = await Order.find(filter)
      .populate(["user", "orderItems.item"])
      .skip(paginate.skip)
      .limit(paginate.limit)
      .sort({ createdAt: -1 });

    const count = await Order.countDocuments(filter);
    return { orders, count };
  };

  const updateOrder = async (
    filter: Record<string, any>,
    updateData: Record<string, any>
  ) => await Order.findOneAndUpdate(filter, updateData, { new: true });

  return { createOrder, getOrderById, allOrders, updateOrder };
}

export type OrderRepositoryMongodbType = typeof OrderRepositoryMongodb;
