import { useQuery, useMutation } from 'react-query';
import { follow, unFollow, getFollowers, getFollowings } from '../apis/user';

export const useFollow = (userId: string) => {
  const { data: followers, refetch: refetchFollowers } = useQuery(
    ['followers', userId],
    () => getFollowers(userId),{
      // refetchOnWindowFocus: false,
    }
  );

  const { data: followings, refetch: refetchFollowings } = useQuery(
    ['followings', userId],
    () => getFollowings(userId),
    {
      // refetchOnWindowFocus: false,
    }
  );

  const followMutation = useMutation(() => follow(userId), {
    onSuccess: () => {
      refetchFollowers();
      refetchFollowings();
    },
  });

  const unfollowMutation = useMutation(() => unFollow(userId), {
    onSuccess: () => {
      refetchFollowers();
      refetchFollowings();
    },
  });

  return {
    followers,
    followings,
    follow: followMutation.mutate,
    unfollow: unfollowMutation.mutate,
  };
};
