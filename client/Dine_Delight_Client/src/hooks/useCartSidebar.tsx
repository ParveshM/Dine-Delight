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

export default function useCartSidebar() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { cart: cartItems } = useAppSelector((state) => state.CartSlice);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [params] = useSearchParams();

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
  const handleCheckout = () => {
    setIsSubmitting(true);
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
