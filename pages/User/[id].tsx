import { useRouter } from 'next/router';
import UserUi from '../../components/User/UserUi';
import { UserState } from '@/redux/reducers/userSlice';
import { RootState } from '@/redux/config/configStore';
import { useSelector } from 'react-redux';

const UserId = () => {
  const router = useRouter();
  const id = typeof router.query.id === 'string' ? router.query.id : '';
  const { user }: { user: UserState['user'] } = useSelector(
    (state: RootState) => state.user
  );

  const loggedInEmail = user.email;

  return <UserUi userId={id} loggedInEmail={loggedInEmail} />;
};

export default UserId;
