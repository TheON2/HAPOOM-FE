import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { AUTH_USER, UserResponse } from '@/redux/reducers/userSlice';
import { getAuthToken } from '@/api/user';

// 훅
export const useAuth = () => {
  const dispatch = useDispatch();
  let tokenExists = false;

  if (typeof window !== 'undefined' && localStorage.getItem('token')) {
    tokenExists = true;
  }

  const { data: userData, isSuccess: tokenSuccess } = useQuery(
    'user',
    getAuthToken,
    {
      onSuccess: (userData: UserResponse) => {
        dispatch(AUTH_USER(userData));
      },
      enabled: tokenExists ? true : false, // 이 값이 확실히 false가 아니면 getAuthToken이 실행됩니다.
      cacheTime: 0,
    }
  );

  return { userData, tokenSuccess };
};
