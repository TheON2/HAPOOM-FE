import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { AUTH_USER, UserResponse } from '@/redux/reducers/userSlice';
import { getAuthToken } from '@/api/user';

// 훅
export const useAuth = () => {
  const dispatch = useDispatch();
  const isClientSide = typeof window !== 'undefined';
  const tokenExists = isClientSide ? !!localStorage.getItem('token') : false;

  const { data: userData, isSuccess: tokenSuccess } = useQuery(
    'user',
    getAuthToken,
    {
      onSuccess: (userData: UserResponse) => {
        dispatch(AUTH_USER(userData));
      },
      enabled: tokenExists,
      cacheTime: 0,
    }
  );

  return { userData, tokenSuccess };
};
