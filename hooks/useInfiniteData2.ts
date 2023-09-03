import { useInfiniteQuery, InfiniteData } from 'react-query';

interface FetchFunctionResponse {
  content: any[]; // 이건 실제로 어떤 데이터가 있는지에 따라 수정이 필요합니다.
  totalPages: number;
  post: any;
}

export const useInfiniteData2 = <T>(
  key: string,
  fetchFunction: (page: number) => Promise<FetchFunctionResponse>
) => {
  const { data, isSuccess, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery<FetchFunctionResponse, Error>(
      key,
      ({ pageParam = 1 }) => fetchFunction(pageParam),
      {
        getNextPageParam: (lastPage, allPages) => {
          const morePagesExist = allPages.length < lastPage.totalPages;
          return morePagesExist ? allPages.length + 1 : false;
        },
      }
    );

  let results: T[] = [];
  if (isSuccess && data) {
    data.pages.forEach((page) => results.push(...page.content));
  }

  const loadMoreButtonOnClick = () => {
    fetchNextPage();
  };

  return {
    results,
    isSuccess,
    isFetchingNextPage,
    loadMoreButtonOnClick,
    hasNextPage,
    data,
  };
};
