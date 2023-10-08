import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
const API_BASE_URL = "http://127.0.0.1:8000/";

export const getJwtTokenFromCookie = () => {
  const cookie = Cookies.get("access_token");

  // console.log("jwt=", cookie);
  return cookie ? cookie : undefined;
};
export const getRefreshTokenFromCookie = () => {
  const cookie = Cookies.get("refresh_token");

  // console.log("refresh=", cookie);
  return cookie ? cookie : undefined;
};

export const publicRequest = axios.create({
  baseURL: API_BASE_URL,
});

export const userRequest = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getJwtTokenFromCookie()}`,
    accept: "application/json",
  },
  withCredentials: true,
});
export const userRequestWdata = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${getJwtTokenFromCookie()}`,
  },
  withCredentials: true,
});

userRequest.interceptors.request.use(
  async (config) => {
    const token = await getJwtTokenFromCookie();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

userRequest.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    // if (
    //   error.response.status === 401 &&
    //   originalRequest.url === baseURL + "api/auth/token/refresh/"
    // ) {
    //   window.location.href = "/login/";
    //   return Promise.reject(error);
    // }
    if (
      error.response.data.code === "token_not_valid" &&
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      // console.log("token not valid, checking for refresh...");
      const refreshToken = Cookies.get("refresh_token");
      // console.log("get refresh: ", refreshToken);

      if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));
        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000);
        // console.log(tokenParts.exp);
        // console.log(tokenParts.exp > now);
        if (tokenParts.exp > now) {
          return userRequest
            .post("api/auth/token/refresh/", { refresh: refreshToken })
            .then((response) => {
              Cookies.set("refresh_token", response.data.refresh);
              Cookies.set("access_token", response.data.access);

              userRequest.defaults.headers["Authorization"] =
                "Bearer " + response.data.access;
              originalRequest.headers["Authorization"] =
                "Bearer " + response.data.access;
              // console.log("new access ", response.data.access);
              // console.log(userRequest(originalRequest));
              return userRequest(originalRequest);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          // console.log("Refresh token is expired", tokenParts.exp, now);
          window.location.href = "/login/";
        }
      } else {
        // console.log("Refresh token not available.");
        window.location.href = "/login/";
      }
    }

    // specific error handling done elsewhere
    return Promise.reject(error);
  }
);
userRequestWdata.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    // if (
    //   error.response.status === 401 &&
    //   originalRequest.url === baseURL + "api/auth/token/refresh/"
    // ) {
    //   window.location.href = "/login/";
    //   return Promise.reject(error);
    // }
    if (
      error.response.data.code === "token_not_valid" &&
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      // console.log("token not valid, checking for refresh...");
      const refreshToken = Cookies.get("refresh_token");
      // console.log("get refresh: ", refreshToken);

      if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));
        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000);
        // console.log(tokenParts.exp);
        // console.log(tokenParts.exp > now);
        if (tokenParts.exp > now) {
          return userRequestWdata
            .post("api/auth/token/refresh/", { refresh: refreshToken })
            .then((response) => {
              Cookies.set("refresh_token", response.data.refresh);
              Cookies.set("access_token", response.data.access);

              userRequestWdata.defaults.headers["Authorization"] =
                "Bearer " + response.data.access;
              originalRequest.headers["Authorization"] =
                "Bearer " + response.data.access;
              // console.log("new access ", response.data.access);
              // console.log(userRequestWdata(originalRequest));
              return userRequestWdata(originalRequest);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          // console.log("Refresh token is expired", tokenParts.exp, now);
          window.location.href = "/login/";
        }
      } else {
        // console.log("Refresh token not available.");
        window.location.href = "/login/";
      }
    }

    // specific error handling done elsewhere
    return Promise.reject(error);
  }
);

export const apiService = {
  public: {
    get: (url, config) => publicRequest.get(url, config),
    post: (url, data, config) => publicRequest.post(url, data, config),
  },
  user: {
    get: (url, config) => userRequest.get(url, config),
    post: (url, data, config) => userRequest.post(url, data, config),
    patch: (url, data, config) => userRequest.patch(url, data, config),
    delete: (url, config) => userRequest.delete(url, config),
  },
  userFormData: {
    post: (url, data, config) => userRequestWdata.post(url, data, config),
  },
};
