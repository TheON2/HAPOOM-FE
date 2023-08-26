import { useRouter } from 'next/router';
import UserUi from '../../components/User/UserUi';
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
