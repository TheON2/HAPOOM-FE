import api from '../axios/api';
import { UserResponse } from '../redux/reducers/userSlice';

interface User {
  email: string | null;
  nickName: string | null;
  imageUrl: string | null;
  profileContent: string | null;
  profileUrl: string | null;
}

interface NewUser {
  email: string;
  password: string;
  nickname: string;
}

interface LoginUser {
  email: string;
  password: string;
}

const addUser = async (newUser: NewUser): Promise<void> => {
  await api.post(`/api/user/signup`, newUser);
};

const getUser = async (userEmail: string): Promise<UserResponse> => {
  const response = await api.get(`/api/user/${userEmail}`);
  return response.data;
};

const getUsers = async (): Promise<User[]> => {
  const response = await api.get(`/api/user`);
  return response.data;
};

const getAuthToken = async (): Promise<string> => {
  const response = await api.get(`/api/user/token`);
  return response.data;
};

const userLogin = async (loginUser: LoginUser): Promise<UserResponse> => {
  const response = await api.post(`/api/user/login`, loginUser);
  return response.data;
};

const userLogOut = async (): Promise<void> => {
  await api.post(`/api/user/logout`);
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
};
