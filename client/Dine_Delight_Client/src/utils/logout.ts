import axios from "axios";
import { TOKEN_API } from "../constants";
import showToast, { ToastType } from "./toaster";
import store from "../redux/store/Store";
import { clearUser } from "../redux/UserSlice";
const logout = (message: string, type: ToastType = "success"): void => {
  axios.defaults.withCredentials = true;
  axios
    .put(TOKEN_API + "/clear_token")
    .then(() => {
      store.dispatch(clearUser());
      showToast(message, type);
    })
    .catch(() => {
      showToast("something went wrong", "error");
    });
};
export default logout;
