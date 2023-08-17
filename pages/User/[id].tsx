import { useRouter } from 'next/router';
import UserUi from '../../components/User/UserUi';
import { UserState } from '@/redux/reducers/userSlice';
import { RootState } from '@/redux/config/configStore';
import { useSelector } from 'react-redux';

import { useEffect } from 'react';
import { setCookie } from 'nookies';

const UserId = () => {
  const router = useRouter();
  const id = typeof router.query.id === 'string' ? router.query.id : '';
  const { user }: { user: UserState['user'] } = useSelector(
    (state: RootState) => state.user
  );

  const loggedInEmail = user.email;

  // useEffect(() => {
  //   setCookie(null, 'userId', id, { path: '/' });
  //   if (loggedInEmail !== null) {
  //     setCookie(null, 'email', loggedInEmail, { path: '/' });
  //   }
  // }, [id, loggedInEmail]); // id와 loggedInEmail 값이 변경될 때마다 쿠키를 업데이트

  return <UserUi userId={id} loggedInEmail={loggedInEmail} />;
};

export default UserId;
