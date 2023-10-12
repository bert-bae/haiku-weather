import Axios from "axios";
import { TOKEN_COOKIE } from "constants/auth";

function getToken() {
  const cookie = document.cookie.split(";").find((c) => {
    const [key] = c.split("=");
    return key.trim() === TOKEN_COOKIE;
  });

  if (cookie) {
    return cookie.split("=")[1];
  }

  return "";
}

// @ts-ignore
Axios.interceptors.request.use((config) => {
  const token = getToken();
  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: token ? `Bearer ${token}` : undefined,
    },
    baseURL: process.env.REACT_APP_SERVER_URL,
  };
});
