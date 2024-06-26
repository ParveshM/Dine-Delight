import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { TOKEN_API } from "../constants";
import logout from "./logout";
import { Payload } from "../types/PropsType";
import { getItemFromLocalStorage } from "./Set&GetLs";

const axiosJWT = axios.create();

const getNewAccessToken = async () => {
  try {
    let refresh_token = getItemFromLocalStorage("refresh_token");
    const { data } = await axios.post(TOKEN_API + "/refresh_token", {
      refresh_token,
    });
    return data?.access_token;
  } catch (err) {
    logout("Session expired ,please Login");
  }
};

const getAccessToken = async () => {
  try {
    let token;
    let user;
    let access_token = getItemFromLocalStorage("access_token");
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
