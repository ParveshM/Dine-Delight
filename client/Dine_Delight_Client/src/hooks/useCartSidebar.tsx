import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store/Store";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import axiosJWT from "../utils/axiosService";
import { USER_API } from "../constants";
import {
  loadCartItems,
  removeItem,
  updateQuantity,
} from "../redux/slices/CartSlice";
import showToast from "../utils/toaster";
import { useSocket } from "../redux/Context/SocketContext";
import { OrderInterface } from "../types/UserInterface";

export default function useCartSidebar(tableData?: {
  tableNumber: string;
  mobile: string;
}) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { cart: cartItems } = useAppSelector((state) => state.CartSlice);
  const user = useAppSelector((state) => state.UserSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { pathname } = useLocation();
  const [params] = useSearchParams();
  const socket = useSocket();

  useEffect(() => {
    axiosJWT
      .get(USER_API + `/bookings/${id}`)
      .then(({ data }) => {
        if (data?.preOrder) {
          dispatch(loadCartItems(data?.preOrder));
        }
      })
      .catch(() => showToast("Oops! Something went wrong", "error"));
  }, []);

  const isMenuSection = useMemo(() => {
    if (pathname) return pathname.startsWith("/menu");
  }, [pathname]);

  const totalAmount = useMemo(() => {
    if (cartItems.length)
      return cartItems.reduce((acc, item) => {
        let subTotal = item?.quantity * item?.price;
        return (acc += subTotal);
      }, 0);
  }, [cartItems]);

  const handleRemoveItem = async (cartItemId: string) => {
    if (!isMenuSection) {
      axiosJWT
        .delete(USER_API + `/booking/preOrder`, {
          data: { bookingId: id, cartItemId },
        })
        .then(() => {
          dispatch(removeItem({ itemId: cartItemId }));
          showToast("Item removed successfully");
        })
        .catch(() => showToast("Oops! Something went wrong", "error"));
    } else {
      dispatch(removeItem({ itemId: cartItemId }));
      showToast("Item removed successfully");
    }
  };

  const handleUpdateQuantity = (
    itemId: string,
    quantity: number,
    type: "increment" | "decrement"
  ) => {
    dispatch(updateQuantity({ itemId, quantity, type }));
  };

  const emitOrderDetails = (
    recieverId: string,
    order: OrderInterface,
    action: "newOrder" | "update_order"
  ) => {
    if (action === "newOrder") {
      const newOrder = { ...order, user: { name: user.name } };
      socket?.emit(action, { recieverId, order: newOrder });
    } else {
      socket?.emit(action, { recieverId, order });
    }
  };

  const handleCheckout = async (tableNumber?: string) => {
    setIsSubmitting(true);
    if (isMenuSection) {
      const items = cartItems.map(({ _id, ...rest }) => ({
        ...rest,
        item: _id,
      }));
      const orderId = params.get("orderId");
      try {
        const requestBody = orderId
          ? { orderItems: items }
          : {
              restaurant: id,
              tableNumber,
              orderItems: items,
              total: totalAmount,
              ...tableData,
            };

        const apiEndpoint = orderId
          ? `${USER_API}/orders/update?orderId=${orderId}`
          : `${USER_API}/order`;
        const response = orderId
          ? await axiosJWT.put(apiEndpoint, requestBody)
          : await axiosJWT.post(apiEndpoint, requestBody);
        const { data } = response;

        orderId
          ? emitOrderDetails(id || "", data.order, "update_order")
          : emitOrderDetails(id || "", data.order, "newOrder");

        showToast(data.message);
        navigate(`/orders`);
      } catch (error) {
        showToast("Oops! Something went wrong", "error");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      axiosJWT
        .post(USER_API + "/booking/preOrder", {
          bookingId: id,
          cartItems,
        })
        .then(() => {
          showToast("Pre order placed successfully");
          navigate(`/booking/view/${id}`);
        })
        .catch(() => showToast("Oops! Something went wrong"))
        .finally(() => setIsSubmitting(false));
    }
  };

  return {
    isSubmitting,
    totalAmount,
    cartItems,
    handleRemoveItem,
    handleUpdateQuantity,
    handleCheckout,
  };
}
