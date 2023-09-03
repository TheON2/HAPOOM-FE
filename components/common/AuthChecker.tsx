import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { AUTH_USER, UserState, UserResponse } from '@/redux/reducers/userSlice';
import { getAuthToken } from '@/apis/user'; // getAuthToken은 별도로 정의해주세요.
import { RootState } from '@/redux/config/configStore';

const AuthChecker: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user }: { user: UserState['user'] } = useSelector(
    (state: RootState) => state.user
  );
  const { data: userData, isSuccess: tokenSuccess } = useQuery(
    'user',
    getAuthToken,
    {
      onSuccess: (data: UserResponse) => {
        dispatch({ type: AUTH_USER, payload: data });
      },
    }
  );


  return <>{children}</>;
};

export default AuthChecker;
