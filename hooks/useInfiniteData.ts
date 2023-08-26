import { useEffect, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
import { getMyPosts, getMyLikedPosts } from '../api/post';

export const useInfiniteData = (type: 'post' | 'like', enabled = true) => {
  const fetchFunction = async ({ pageParam = 1 }) => {
    const method = 'GET';
    if (type === 'post') {
      return await getMyPosts(method, pageParam);
    } else if (type === 'like') {
      return await getMyLikedPosts(method, pageParam);
    }

    throw new Error('Invalid fetchFunction type');
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, ...rest } =
    useInfiniteQuery([type], fetchFunction, {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage && lastPage.length > 0) {
          return allPages.length + 1;
        }
        return null; // 다음 페이지 없음
      },
      enabled,
    });

  const lastFetchedTime = useRef(Date.now());

  useEffect(() => {
    const handleScroll = () => {
      console.log('Scroll event triggered');
      if (Date.now() - lastFetchedTime.current < 200) {
        return;
      }

      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 300
      ) {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
          lastFetchedTime.current = Date.now();
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
