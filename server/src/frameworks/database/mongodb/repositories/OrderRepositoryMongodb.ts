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
  const allOrders = async (filter: Record<string, any>) =>
    await Order.find(filter).populate("orderItems.item");
  const updateOrder = async (
    orderId: string,
    updateData: Record<string, any>
  ) => await Order.updateOne({ orderId }, { updateData });

  return { createOrder, getOrderById, allOrders, updateOrder };
}

export type OrderRepositoryMongodbType = typeof OrderRepositoryMongodb;
