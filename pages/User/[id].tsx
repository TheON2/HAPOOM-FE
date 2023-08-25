import { useRouter } from 'next/router';
import UserUi from '../../components/User/UserUi';
import { UserState } from '@/redux/reducers/userSlice';
import { RootState } from '@/redux/config/configStore';
import { useSelector } from 'react-redux';
import { useEffect } from 'react'; // useEffect를 추가로 임포트해야 합니다.
import { useAuth } from '@/hooks/useAuth';

const UserId = () => {
  const router = useRouter();
  const id = router.isReady
    ? typeof router.query.id === 'string'
      ? router.query.id
      : ''
    : '';

  const { userData, tokenSuccess } = useAuth();

  return <UserUi userId={id} loggedInEmail={userData?.email} />;
};

export default UserId;
