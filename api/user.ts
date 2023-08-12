import api from '../axios/api';
import { UserResponse } from '../redux/reducers/userSlice';

interface User {
  email: string | null;
  nickName: string | null;
  userImage: string | null;
  preset: number | null;
}

interface NewUser {
  email: string;
  password: string;
  nickname: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface AuthUser {
  email: string;
  nickname: string;
}

const addUser = async (newUser: NewUser): Promise<void> => {
  await api.post(`/api/auth/signup`, newUser);
};

const getUser = async (userEmail: string): Promise<UserResponse> => {
  const response = await api.get(`/api/user/${userEmail}`);
  return response.data;
};

const getUserSetting = async () => {
  const response = await api.get(`/api/user`);
  return response.data;
};

const updateUserSetting = async (userData: FormData) => {
  const response = await api.patch(`/api/user`, userData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

const getUserProfile = async () => {
  const response = await api.get(`/api/user/profile`);
  return response.data;
};

const getUsers = async (): Promise<User[]> => {
  const response = await api.get(`/api/user`);
  return response.data;
};

const getAuthToken = async (): Promise<AuthUser> => {
  const response = await api.get(`/api/auth/token`);
  return response.data;
};

const userLogin = async (loginUser: LoginUser): Promise<UserResponse> => {
  const response = await api.post(`/api/auth/login`, loginUser);
  return response.data;
};

const userLogOut = async (): Promise<void> => {
  await api.get(`/api/auth/logout`);
};

const updateUser = async (sendData: {
  email: string;
  nickname: string;
}): Promise<void> => {
  await api.patch(`/api/user/${sendData.email}/nickname`, {
    nickname: sendData.nickname,
  });
};

const deleteUser = async (userEmail: string): Promise<void> => {
  await api.delete(`/api/user/${userEmail}`);
};

export {
  addUser,
  getUser,
  getUsers,
  getAuthToken,
  updateUser,
  deleteUser,
  userLogin,
  userLogOut,
  getUserSetting,
  updateUserSetting,
  getUserProfile,
};
