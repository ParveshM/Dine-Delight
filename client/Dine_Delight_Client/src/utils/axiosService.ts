import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { TOKEN_API } from "../constants";
import logout from "./logout";

const axiosJWT = axios.create();
axiosJWT.defaults.withCredentials = true; // for send back the cookies stored in the browser
axios.defaults.withCredentials = true;

const getNewAccessToken = async () => {
  try {
    await axios.post(TOKEN_API + "/refresh_token");
  } catch (error: any) {
    logout("Session expired ,please Login");
    console.log("Error in refreshing token" + error, error.status);
    throw new Error("refresh token expired");
  }
};

const getAccessToken = async () => {
  let token;
  await axios
    .post(TOKEN_API + "/get_accessToken")
    .then(({ data }) => {
      token = data?.access_token;
    })
    .catch((error) => console.log(error));
  return token;
};

axiosJWT.interceptors.request.use(async (config) => {
  let currentDate = new Date();
  let decodedToken;
  try {
    const accessToken: any = await getAccessToken();
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
