import toast from "react-hot-toast";
export type ToastType = "success" | "error" | "warn";
export const showToast = (message: string, type: ToastType = "success") => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "warn":
      toast.error(message, {
        duration: 4000,
        position: "top-center",
        style: {
          background: "#ffdb4d",
          color: "#000000",
        },
      });
      break;
    default:
      toast.success(message);
      break;
  }
};

export default showToast;
