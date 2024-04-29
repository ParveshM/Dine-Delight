import { OrderInterface } from "../../../../types/userInterface";
import { OrderDbRepositoryInterface } from "../../../interfaces/OrderDbRepository";

export const createNewOrder = async (
  userId: string,
  orderData: OrderInterface,
  orderRepository: ReturnType<OrderDbRepositoryInterface>
) => {
  orderData.user = userId;

  return await orderRepository.createOrder(orderData);
};

export const getAllOrders = async (
  filter: Record<string, any>,
  orderRepository: ReturnType<OrderDbRepositoryInterface>
) => await orderRepository.allOrders(filter);

export const updateOrderItem = async (
  orderId: string,
  updateData: Record<string, any>,
  orderRepository: ReturnType<OrderDbRepositoryInterface>
) => await orderRepository.updateOrder(orderId, updateData);
