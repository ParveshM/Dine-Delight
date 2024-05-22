import showToast, { ToastType } from "./toaster";
import store from "../redux/store/Store";
import { clearUser } from "../redux/slices/UserSlice";
import { removeItemFromLocalStorage } from "./Set&GetLs";

const logout = (message: string, type: ToastType = "success"): void => {
  store.dispatch(clearUser());
  removeItemFromLocalStorage("access_token");
  removeItemFromLocalStorage("refresh_token");
  showToast(message, type);
};
export default logout;
