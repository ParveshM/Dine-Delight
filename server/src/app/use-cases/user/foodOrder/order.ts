import { OrderInterface } from "../../../../types/userInterface";
import { OrderDbRepositoryInterface } from "../../../interfaces/OrderDbRepository";

export const createNewOrder = async (
  userId: string,
  orderData: OrderInterface,
  OrderRepository: ReturnType<OrderDbRepositoryInterface>
) => {
  orderData.user = userId;

  return await OrderRepository.createOrder(orderData);
};

export const getAllOrders = async (
  OrderRepository: ReturnType<OrderDbRepositoryInterface>,
  user?: string
) => await OrderRepository.allOrders({ user });
