import { OrderRepositoryMongodbType } from "../../frameworks/database/mongodb/repositories/OrderRepositoryMongodb";
import { PaginateInterface } from "../../types/restaurantInterface";
import { OrderInterface } from "../../types/userInterface";

export default function OrderDbRepository(
  repository: ReturnType<OrderRepositoryMongodbType>
) {
  const createOrder = async (orderData: OrderInterface) =>
    repository.createOrder(orderData);
  const getOrderById = async (orderId: string) =>
    repository.getOrderById(orderId);
  const allOrders = async (
    filter: Record<string, any>,
    paginate: PaginateInterface
  ) => repository.allOrders(filter, paginate);
  const updateOrder = async (
    filter: Record<string, any>,
    updateData: Record<string, any>
  ) => repository.updateOrder(filter, updateData);

  return { createOrder, getOrderById, allOrders, updateOrder };
}
export type OrderDbRepositoryInterface = typeof OrderDbRepository;
