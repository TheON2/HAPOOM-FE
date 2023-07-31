import { useInfiniteQuery } from 'react-query';

export const useInfiniteData = (key, fetchFunction) => {
  const {
    data,
    isSuccess,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    key,
    ({ pageParam = 1 }) => fetchFunction(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const morePagesExist = allPages.length < lastPage.totalPages;
        return morePagesExist ? allPages.length + 1 : false;
      },
    }
  );

  let results = [];
  if (isSuccess) {
    data.pages.forEach(page => results.push(...page.content));
  }

  const loadMoreButtonOnClick = () => {
    fetchNextPage();
  };

  return { results, isSuccess, isFetchingNextPage, loadMoreButtonOnClick, hasNextPage,data };
};
