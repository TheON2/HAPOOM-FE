import api from '../axios/api';
import { UserResponse } from '../redux/reducers/userSlice';

interface User {
  userId: number;
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
  const response = await api.put(`/api/user`, userData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

type getUserProps = {
  UserId: string;
};

const getUserProfile = async ({ UserId: userId }: getUserProps) => {
  try {
    console.log('Fetching user profile for userId:', userId);
    const response = await api.get(`/api/user/profile/${userId}`);
    console.log('API response data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

const getMyProfile = async () => {
  const response = await api.get(`/api/user/myprofile`);
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

const test = async () => {
  await api.get(`/test/test`);
};

const follow = async (userId: string) => {
  const response = await api.post(`/api/user/${userId}/follow`);
  return response.data;
};

const unFollow = async (userId: string) => {
  const response = await api.post(`/api/user/${userId}/unfollow`);
  return response.data;
};

const getFollowers = async (userId: string | number): Promise<User[]> => {
  try {
    const response = await api.get(`/api/user/${String(userId)}/follower`);
    if (response.data && Array.isArray(response.data.followers)) {
      return response.data.followers;
    }
    console.error('Unexpected format in response:', response.data);
    return [];
  } catch (error) {
    console.error('Error fetching followers:', error);
    return [];
  }
};

const getFollowings = async (userId: string): Promise<User[]> => {
  try {
    const response = await api.get(`/api/user/${userId}/following`);
    if (response.data && Array.isArray(response.data.following)) {
      return response.data.following;
    }
    console.error('Unexpected format in response:', response.data);
    return [];
  } catch (error) {
    console.error('Error fetching followings:', error);
    return [];
  }
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
  getMyProfile,
  test,
  follow,
  unFollow,
  getFollowers,
  getFollowings,
};
