export const nameRegex = /^[A-Z][a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
export const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
export const BASE_URL = "http://localhost:3000/api/";
export const USER_API = BASE_URL + "user";
export const RESTAURANT_API = BASE_URL + "restaurant";
export const ADMIN_API = BASE_URL + "admin";
export const TOKEN_API = BASE_URL + "token";
import { LayoutDashboard, LogOut, Utensils } from "lucide-react";
import { MdOutlineTableBar } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { MdOutlineRestaurantMenu } from "react-icons/md";

export const sidebarItem = [
  {
    to: "/restaurant/dashboard",
    Icon: LayoutDashboard,
    text: "Dashboard",
  },
  {
    to: "/restaurant/reservations",
    Icon: SlCalender,
    text: "Reservations",
  },
  {
    to: "/restaurant/table",
    Icon: MdOutlineTableBar,
    text: "Tables",
  },
  {
    to: "/restaurant/menu",
    Icon: MdOutlineRestaurantMenu,
    text: "Menu",
  },
  {
    to: "/restaurant/view",
    Icon: Utensils,
    text: "Restaurant",
  },
  {
    to: "#",
    Icon: LogOut,
    text: "Signout",
  },
];
