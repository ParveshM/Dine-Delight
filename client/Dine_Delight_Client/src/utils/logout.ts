import showToast, { ToastType } from "./toaster";
import store from "../redux/store/Store";
import { clearUser } from "../redux/slices/UserSlice";

const logout = (message: string, type: ToastType = "success"): void => {
  store.dispatch(clearUser());
  showToast(message, type);
};
export default logout;
