import axios from 'axios';
import { LOGOUT_USER } from '../redux/reducers/userSlice';
import store from '../redux/config/configStore';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LOCAL_SERVER,
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
      }
    }
    return config;
  },
  (error) => {
    // console.log('인터셉트 실패');
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response &&
      (error.response.status === 501 || error.response.status === 403)
    ) {
      // console.log('토큰이 존재하지 않습니다');
      store.dispatch(LOGOUT_USER());

      // // 아래 라인을 추가하여 로그인 페이지로 리다이렉션합니다.
      // if (typeof window !== 'undefined') {
      //   window.location.href = '/auth/SignIn';
      // }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 502 &&
      !originalRequest._retry
    ) {
      // console.log('액세스토큰이 유효하지 않습니다.');
      originalRequest._retry = true;
      try {
        const { data } = await instance.get(
          `${process.env.NEXT_PUBLIC_LOCAL_SERVER}/api/auth/refreshtoken`
        );
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', data.token);
        }
        originalRequest.headers['Authorization'] = 'Bearer ' + data.token;
        return instance(originalRequest);
      } catch (err) {
        // console.log('리프레시토큰이 만료되었습니다.');
        store.dispatch(LOGOUT_USER());
        // if (typeof window !== 'undefined') {
        //   window.location.href = '/auth/SignIn';
        // }
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
