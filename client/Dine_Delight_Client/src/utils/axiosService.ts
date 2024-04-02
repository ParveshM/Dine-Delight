import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { TOKEN_API } from "../constants";
import logout from "./logout";
import { Payload } from "../types/PropsType";

const axiosJWT = axios.create();
axiosJWT.defaults.withCredentials = true; // for send back the cookies stored in the browser
axios.defaults.withCredentials = true;

const getNewAccessToken = async () => {
  try {
    await axios.post(TOKEN_API + "/refresh_token");
  } catch (err) {
    logout("Session expired ,please Login");
  }
};

const getAccessToken = async () => {
  try {
    let token;
    let user;
    const { data } = await axios.get(TOKEN_API + "/accessToken");

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
  try {
    const accessToken: string = await getAccessToken();
    if (!accessToken) {
      await getNewAccessToken();
      return config;
    }
    decodedToken = await jwtDecode(accessToken);
  } catch (error) {
    console.log("error in decodeToken" + error);
  }
  if (decodedToken.exp * 1000 < currentDate.getTime()) {
    await getNewAccessToken();
  }
  return config;
});

export default axiosJWT;
