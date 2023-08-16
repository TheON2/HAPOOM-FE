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
        if (!lastPage) {
          return false;
        }
        const morePagesExist = allPages.length < lastPage.totalPages;
        return morePagesExist ? allPages.length + 1 : false;
      },
    }
  );

  let results = [];
  if (isSuccess) {
    console.log("API Response:", data);
    data.pages.forEach(page => {
      if (!page) {
        console.warn("Undefined page in the response!");
      } else if (!page.content) {
        console.warn("Page does not contain 'content' property:", page);
      } else {
        results.push(...page.content);
      }
    });
  }

  const loadMoreButtonOnClick = () => {
    fetchNextPage();
  };

  return { results, isSuccess, isFetchingNextPage, loadMoreButtonOnClick, hasNextPage, data };
};

export default useInfiniteData;
