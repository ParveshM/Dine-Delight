export const nameRegex = /^[A-Z][a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
export const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
export const addressRegex = /^[A-Z][A-Za-z0-9\s.,-]+$/;
export const descriptionRegex = /^[A-Z][A-Za-z\s,.'"-]*$/;
export const phoneRegex = /^\d{10}$/;
export const timeRegex = /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM|am|pm)$/;
export const SERVER_URL = "http://localhost:3000";
export const BASE_URL = "http://localhost:3000/api/";
export const USER_API = BASE_URL + "user";
export const RESTAURANT_API = BASE_URL + "restaurant";
export const ADMIN_API = BASE_URL + "admin";
export const TOKEN_API = BASE_URL + "token";
export const CHAT_API = BASE_URL + "chat";
export const CLOUDINARY_UPLOAD_API =
  "https://api.cloudinary.com/v1_1/dcoveyjze/upload";
export const CLOUDNAME = "dcoveyjze";
export const cloudinaryUploadPreset = "restaurant";
export const randomImg = "https://picsum.photos/200/";

import { Hourglass, LayoutDashboard, LogOut, Utensils } from "lucide-react";
import { MdOutlineTableBar } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";

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
    to: "/restaurant/time_slots",
    Icon: Hourglass,
    text: "TimeSlots",
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

export const NavbarItem = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/contactUs", label: "Contact Us" },
];

export const defaultImageCardImage =
  "https://static.vecteezy.com/system/resources/previews/004/141/669/original/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg";

export const userSidebarItem = [
  {
    to: "/profile",
    Icon: FaUser,
    text: "Profile",
  },
  {
    to: "/booking_history",
    Icon: FaHistory,
    text: "Booking History",
  },
  {
    to: "/bookmarks",
    Icon: FaBookmark,
    text: "Bookmarks",
  },
];

export const reservationTableColomns = [
  { label: "BookingID", key: "bookingId" },
  { label: "Name", key: "name" },
  { label: "Time", key: "time" },
  { label: "Date", key: "date" },
  { label: "Table Size", key: "tableSize" },
  { label: "Status", key: "status" },
  { label: "Action", key: "action" },
];

export const menuCategories = [
  "starters",
  "main course",
  "drinks",
  "dessert",
] as const;

export const cookingStatuses: string[] = [
  "Accepted",
  "Preparing",
  "Ready",
  "Served",
  "Delayed",
];
export const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const statusLabel = [
  "Pending",
  "Confirmed",
  "Cancelled",
  "Checked-in",
  "No-show",
  "Completed",
];
