import { OrderRepositoryMongodbType } from "../../frameworks/database/mongodb/repositories/OrderRepositoryMongodb";
import { OrderInterface } from "../../types/userInterface";

export default function OrderDbRepository(
  repository: ReturnType<OrderRepositoryMongodbType>
) {
  const createOrder = async (orderData: OrderInterface) =>
    repository.createOrder(orderData);
  const getOrderById = async (orderId: string) =>
    repository.getOrderById(orderId);
  const allOrders = async (filter: Record<string, any>) =>
    repository.allOrders(filter);
  const updateOrder = async (
    orderId: string,
    updateData: Record<string, any>
  ) => repository.updateOrder(orderId, updateData);

  return { createOrder, getOrderById, allOrders, updateOrder };
}
export type OrderDbRepositoryInterface = typeof OrderDbRepository;
