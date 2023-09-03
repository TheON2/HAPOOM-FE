import { useEffect, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
import { getMyPosts, getMyLikedPosts, getFeed } from '../apis/post';

export const useInfiniteData = (
  type: 'post' | 'like' | 'feed',
  enabled = true
) => {
  const fetchFunction = async ({ pageParam = 1 }) => {
    const method = 'GET';
    if (type === 'post') {
      return await getMyPosts(method, pageParam);
    } else if (type === 'like') {
      return await getMyLikedPosts(method, pageParam);
    } else if (type === 'feed') {
      //return await getFeed(method, pageParam);
    }

    throw new Error('Invalid fetchFunction type');
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, ...rest } =
    useInfiniteQuery([type], fetchFunction, {
      getNextPageParam: (lastPage) => {
        // Check if nextPage is present in the last page's data and return it
        if (lastPage.hasNextPage) {
          return lastPage.nextPage || lastPage.nextLikedPage;
        }
        return null;
      },
      enabled,
    });

  const lastFetchedTime = useRef(Date.now());

  useEffect(() => {
    const handleScroll = () => {
      if (Date.now() - lastFetchedTime.current < 200) {
        return;
      }

      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 400
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
