import axios from "axios";
import store from "../redux/config/configStore";
import {LOGOUT_USER} from "../redux/reducers/userSlice";

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_LOCAL_SERVER,
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 400 &&
      error.response.data.message === "Unable to issue access tokens" &&
      !originalRequest._retry
    ) {
      console.log("액세스토큰이 유효하지 않습니다.");
      originalRequest._retry = true;
      try {
        await instance.get(`${import.meta.env.VITE_APP_LOCAL_SERVER}/refreshToken`
        );
        return instance(originalRequest);
      } catch (err) {
        console.log("리프레시토큰이 만료되었습니다.");
        store.dispatch(LOGOUT_USER());
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
