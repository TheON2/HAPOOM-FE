import { useInfiniteQuery } from 'react-query';
import { getPost, likePost } from '../api/post'

const fetchFunction = async (type, id, page, pageSize) => {
  if (type === 'post') {
    return getPost(id, page);
  } else if (type === 'like') {
    return likePost(id, page);
  }
  throw new Error('Invalid fetchFunction type');
};

export const useInfiniteData = (type, id, pageSize) => {
  const {
    data,
    isSuccess,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery([type, id], ({ pageParam = 1 }) => fetchFunction(type, id, pageParam), {
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage) {
        return false;
      }
      const postsCount = allPages.reduce((total, currentPage) => total + currentPage.length, 0);

      if (postsCount < lastPage[0]?.totalCount) {
        return allPages.length + 1;
      } else {
        return false;
      }
    },
  });

  let results = [];
  if (isSuccess) {
    data.pages.forEach((page) => {
      results.push(...page);
    });
  }

  return {
    results,
    isSuccess,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  };
};

export default useInfiniteData;
