import axios from "axios";
import { TOKEN_API } from "../constants";
import showToast from "./toaster";
import store from "../redux/store/Store";
import { clearUser } from "../redux/UserSlice";
const logout = (message: string): void => {
  axios.defaults.withCredentials = true;
  axios
    .post(TOKEN_API + "/clear_token")
    .then(() => {
      store.dispatch(clearUser());
      showToast(message, "success");
    })
    .catch(() => {
      showToast("something went wrong", "error");
    });
};
export default logout;
