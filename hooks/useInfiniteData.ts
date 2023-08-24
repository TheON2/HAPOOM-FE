import { useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import { getMyPosts, getMyLikedPosts } from '../api/post';

export const useInfiniteData = (
  type: 'post' | 'like',
  method: string,
  enabled = true
) => {
  const fetchFunction = async ({ pageParam = 1 }) => {
    if (type === 'post') {
      return await getMyPosts(method, pageParam);
    } else if (type === 'like') {
      return await getMyLikedPosts(method, pageParam);
    }

    throw new Error('Invalid fetchFunction type');
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, ...rest } =
    useInfiniteQuery([type, method], fetchFunction, {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage && lastPage.length === 12) {
          return allPages.length + 1;
        }
        return false;
      },
      enabled,
    });

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 500
      ) {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    ...rest,
  };
};
