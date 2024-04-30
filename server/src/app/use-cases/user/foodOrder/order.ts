import { HttpStatus } from "../../../../types/httpStatus";
import { PaginateInterface } from "../../../../types/restaurantInterface";
import { OrderInterface } from "../../../../types/userInterface";
import CustomError from "../../../../utils/customError";
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
  paginate: PaginateInterface,
  orderRepository: ReturnType<OrderDbRepositoryInterface>
) => await orderRepository.allOrders(filter, paginate);

export const updateOrderItem = async (
  orderId: string,
  updateData: Record<string, any>,
  orderRepository: ReturnType<OrderDbRepositoryInterface>
) => await orderRepository.updateOrder({ orderId }, updateData);

export const addMoreItemToOrder = async (
  orderId: string,
  updateData: OrderInterface,
  orderRepository: ReturnType<OrderDbRepositoryInterface>
) => {
  try {
    const order = await orderRepository.getOrderById(orderId);

    for (const newItem of updateData.orderItems) {
      const existingItem =
        order &&
        order.orderItems.find(
          (item) => item.item?.toString() === newItem.item.toString()
        );

      if (existingItem) {
        await orderRepository.updateOrder(
          { orderId, "orderItems.item": newItem.item },
          { $inc: { "orderItems.$.quantity": newItem.quantity } }
        );
      } else {
        await orderRepository.updateOrder(
          { orderId },
          { $push: { orderItems: newItem } }
        );
      }
    }
    return await orderRepository.getOrderById(orderId);
  } catch (error) {
    console.error("Error updating order items:", error);
    throw new CustomError("Error updating order items", HttpStatus.BAD_REQUEST);
  }
};
