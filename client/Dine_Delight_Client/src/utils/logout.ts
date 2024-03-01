import axios from "axios";
import { TOKEN_API } from "../constants";
import showToast from "./toaster";

const logout = (message: string): void => {
  axios.defaults.withCredentials = true;
  axios
    .post(TOKEN_API + "/clear_token")
    .then(() => {
      showToast(message, "success");
    })
    .catch(() => {
      showToast("something went wrong");
    });
};
export default logout;
