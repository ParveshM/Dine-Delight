import { useState, useEffect, useCallback, useRef } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { MenuCategory, MenuItemInterface } from "../types/RestaurantInterface";
import axiosJWT from "../utils/axiosService";
import showToast from "../utils/toaster";
import { USER_API } from "../constants";
import { BookingInterface } from "../types/BookingInterface";
import { useAppDispatch, useAppSelector } from "../redux/store/Store";
import { addToCart, clearCart } from "../redux/slices/CartSlice";
import { calculateDiscountedPrice } from "../utils/util";
import axios from "axios";

export default function useCart() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isVegFilterActive, setIsVegFilterActive] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] =
    useState<MenuCategory>("starters");
  const [menuItems, setMenuItems] = useState<MenuItemInterface[]>([]);
  const [booking, setBooking] = useState<BookingInterface | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
  const observer = useRef<IntersectionObserver>();
  const hasPageBeenRendered = useRef(false);
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.UserSlice);
  const [showTableInputModal, setTableInputModal] = useState<boolean>(false);
  const [formData, setFormData] = useState<{
    tableNumber: string;
    mobile: string;
  }>({
    tableNumber: "",
    mobile: "",
  });

  const lastMenuItem = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading || isLoadingMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, isLoadingMore, hasMore]
  );

  useEffect(() => {
    const isOrderSection = pathname.startsWith("/menu");
    if (isOrderSection && !params.get("orderId")) {
      if (user.isAuthenticated) setTableInputModal(true);
    } else {
      axiosJWT
        .get(USER_API + `/bookings/${id}`)
        .then(({ data }) => setBooking(data.bookingDetails))
        .catch(() => showToast("Oops! Something went wrong", "error"));
    }
  }, []);

  useEffect(() => {
    setMenuItems([]);
    setPage(1);
    if (selectedCategory === "drinks" || selectedCategory === "dessert") {
      setIsVegFilterActive(false); // drinks and desserts wont be veg or non veg so no filteing required
    }
  }, [selectedCategory, isVegFilterActive, searchQuery]);

  useEffect(() => {
    async function fetchMenu() {
      page > 1 ? setIsLoadingMore(true) : setIsLoading(true);
      axios
        .get(USER_API + `/menu`, {
          params: {
            q: searchQuery,
            page,
            ...(pathname.startsWith("/cart")
              ? { bookingId: id }
              : { restaurantId: id }),
            category: selectedCategory,
            ...(isVegFilterActive && { isVegetarian: isVegFilterActive }),
          },
        })
        .then(({ data }) => {
          setMenuItems((prev) => [...prev, ...data.menu]);
          setHasMore(data.menu?.length > 0);
          page > 1 ? setIsLoadingMore(false) : setIsLoading(false);
        })
        .catch(() => showToast("Oops! Something went wrong", "error"));
    }
    if (hasPageBeenRendered.current) {
      fetchMenu();
    } else {
      hasPageBeenRendered.current = true;
      return () => {
        dispatch(clearCart());
      };
    }
  }, [
    selectedCategory,
    searchQuery,
    isVegFilterActive,
    page,
    hasPageBeenRendered.current,
  ]);

  const handleAddToCart = (item: MenuItemInterface) => {
    const { _id, name, price, discount } = item;
    const discountPrice = calculateDiscountedPrice(price, discount);
    dispatch(
      addToCart({
        _id,
        name,
        price: discountPrice,
        quantity: 1,
      })
    );
    showToast("Item added to cart successfully");
  };

  return {
    booking,
    menuItems,
    isLoading,
    formData,
    searchQuery,
    isDrawerOpen,
    lastMenuItem,
    setDrawerOpen,
    isSidebarOpen,
    setFormData,
    isLoadingMore,
    setSearchQuery,
    handleAddToCart,
    setIsSidebarOpen,
    selectedCategory,
    setTableInputModal,
    isVegFilterActive,
    showTableInputModal,
    setIsVegFilterActive,
    setSelectedCategory,
  };
}
