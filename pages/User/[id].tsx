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

  const { userData, tokenSuccess, tokenExists } = useAuth();
  // id와 userData가 확실하게 로드되었는지 확인합니다.
  if (!id || !userData?.email) {
    return null; // 아무것도 반환하지 않습니다. (또는 로딩 컴포넌트를 반환할 수 있습니다.)
  }

  if (!tokenExists) {
    return <UserUi userId={id} loggedInEmail={userData?.email} />;
  } else {
    return (
      tokenSuccess && <UserUi userId={id} loggedInEmail={userData?.email} />
    );
  }
};

export default UserId;
