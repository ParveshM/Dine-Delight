import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { TOKEN_API } from "../constants";
import logout from "./logout";
import { Payload } from "../types/PropsType";
import store from "../redux/store/Store";
import { setTokens } from "../redux/slices/UserSlice";

const axiosJWT = axios.create();
axiosJWT.defaults.withCredentials = true; // for send back the cookies stored in the browser
axios.defaults.withCredentials = true;
let access_token = "";
let refresh_token = "";
const handleChange = () => {
  const token = store.getState().UserSlice as {
    access_token: string;
    refresh_token: string;
  };
  access_token = token.access_token;
  refresh_token = token.refresh_token;
};
store.subscribe(handleChange);

const getNewAccessToken = async () => {
  try {
    const { data } = await axios.post(TOKEN_API + "/refresh_token", {
      refresh_token,
    });
    store.dispatch(
      setTokens({
        access_token: data.access_token,
        refresh_token,
      })
    );
    return data?.access_token;
  } catch (err) {
    logout("Session expired ,please Login");
  }
};

const getAccessToken = async () => {
  try {
    let token;
    let user;
    const { data } = await axios.get(TOKEN_API + "/accessToken", {
      params: { access_token },
    });

    token = data?.access_token;
    user = data?.user;

    const decodedToken: Payload = await jwtDecode(token);
    const { role } = decodedToken;
    if (role === "seller" || role === "user") {
      if (user.isBlocked)
        logout("Your account has been blocked by administrator", "error");
    }

    return token;
  } catch (error) {
    console.log(error, "Error in getting token");
  }
};

axiosJWT.interceptors.request.use(async (config) => {
  let currentDate = new Date();
  let decodedToken;
  let accessToken;
  try {
    accessToken = await getAccessToken();

    decodedToken = await jwtDecode(accessToken);
  } catch (error) {
    console.log("error in decodeToken" + error);
  }

  if (decodedToken.exp * 1000 < currentDate.getTime()) {
    accessToken = await getNewAccessToken();
  }
  config.headers["Authorization"] = "Bearer " + accessToken;

  return config;
});

export default axiosJWT;
