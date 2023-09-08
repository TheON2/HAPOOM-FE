import api from '../../axios/api';
import { UserResponse } from '../../redux/reducers/userSlice';

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

const addUserTest = async (newUser: NewUser): Promise<void> => {
  await api.post(`/test/user/signup`, newUser);
};

const getUserTest = async (userEmail: string): Promise<UserResponse> => {
  const response = await api.get(`/test/user/${userEmail}`);
  return response.data;
};

const getUsersTest = async (): Promise<User[]> => {
  const response = await api.get(`/test/user`);
  return response.data;
};

const getAuthTokenTest = async (): Promise<string> => {
  const response = await api.get(`/test/user/token`);
  return response.data;
};

const userLoginTest = async (loginUser: LoginUser): Promise<UserResponse> => {
  const response = await api.post(`/test/user/login`, loginUser);
  return response.data;
};

const userLogOutTest = async (): Promise<void> => {
  await api.post(`/test/user/logout`);
};

const updateUserTest = async (sendData: {
  email: string;
  nickname: string;
}): Promise<void> => {
  await api.patch(`/test/user/${sendData.email}/nickname`, {
    nickname: sendData.nickname,
  });
};

const deleteUserTest = async (userEmail: string): Promise<void> => {
  await api.delete(`/test/user/${userEmail}`);
};

export {
  addUserTest,
  getUserTest,
  getUsersTest,
  getAuthTokenTest,
  updateUserTest,
  deleteUserTest,
  userLoginTest,
  userLogOutTest,
};
