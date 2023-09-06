import React, { FormEvent, useEffect, useState } from 'react';
import useInput from '@/hooks/useInput';
import SearchResult from '@/components/Search/SearchResult';
import {
  SearchLayout,
  NoneSearchResult,
  SearchResultBox,
  RecommendedSearchList,
  RecommendedSearchItem,
} from '@/styles/search';
import { getSearch } from '@/api/post';
import { useQuery } from 'react-query';
import useModal from '@/hooks/useModal';
import Modal from '@/components/common/Modal';
import { useDispatch } from 'react-redux';
import { TOGGLE_SUPER_USER } from '@/redux/reducers/userSlice';
import {
  SELECT_OPTION,
  RECOMMENDED_KEYWORD_USER,
  RECOMMENDED,
  SUPER_KEYWORD,
} from '@/components/Search/searchData';
import SearchForm from '@/components/Search/SearchForm';
const Search = () => {
  const dispatch = useDispatch();
  const [search, searchHandler, setSearch] = useInput('');
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [option, setOption] = useState<string>(SELECT_OPTION[0].value);
  const [recommended, setRecommended] = useState<any[]>(
    RECOMMENDED_KEYWORD_USER
  );
  const { isModalOpen, modalMessge, openModal, closeModal } = useModal();
  useEffect(() => {
    if (isSearch) {
      const timer = setTimeout(() => {
        setIsSearch(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isSearch]);
  const onClickKeywordHanlder = (keyword: string) => {
    setSearch(keyword);
    setIsSearch(true);
  };

  const onSubmitSearchHandler = (e: FormEvent) => {
    e.preventDefault();
    if (search === SUPER_KEYWORD) {
      dispatch(TOGGLE_SUPER_USER());
      openModal({
        actionText: '확인',
        modalMessge: '슈퍼계정 ON',
      });
    }
    if (search === '') {
      openModal({
        actionText: '확인',
        modalMessge: '검색 내용을 입력해주세요.',
      });
      return;
    } else {
      setIsSearch(true);
    }
  };
  // const
  const { data: searchData, isSuccess } = useQuery(
    ['searchResults', option, search],
    () => getSearch({ search, option }),
    {
      enabled: isSearch && !!search,
      staleTime: 60 * 1000,
      onSuccess: (data) => {
        setIsSearch(false);
      },
      refetchOnWindowFocus: false,
    }
  );
  const IntroMessage = () => {
    if (searchData) {
      return (
        <>
          <span className="highligth">{search}</span>에 대한 결과입니다.
        </>
      );
    }
    if (search === '') {
      return (
        <>
          오늘은 어떤
          <span className="highligth"> 하늘</span>을 검색해볼까요?
        </>
      );
    } else {
      return (
        <>
          <span className="highligth">{search}</span>을(를) 검색해볼까요?
        </>
      );
    }
  };
  useEffect(() => {
    const beforeSearchKeyword = RECOMMENDED.filter(
      (category) => category.category === option
    )[0].data;
    setRecommended(beforeSearchKeyword);
    // console.log(recommended);
  }, [option]);
  return (
    <>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          setIsOpen={closeModal}
          actionText={modalMessge.actionText}
          onClickEvent={modalMessge.onClickEvent || null}
        >
          {modalMessge.modalMessge}
        </Modal>
      )}
      <SearchLayout>
        <p className="keyword">{IntroMessage()}</p>
        <SearchForm
          setOption={setOption}
          setIsSearch={setIsSearch}
          search={search}
          searchEvent={searchHandler}
          submitEvent={onSubmitSearchHandler}
        />
      </SearchLayout>
      <SearchResultBox>
        {searchData ? (
          <SearchResult option={option} data={searchData} />
        ) : !isSuccess ? (
          <>
            <p>현재 인기 있는 검색어입니다</p>
            <RecommendedSearchList>
              {recommended.map((keyword, idx) => {
                return (
                  <RecommendedSearchItem
                    key={idx}
                    onClick={() => onClickKeywordHanlder(keyword.searchText)}
                  >
                    {keyword.viewText}
                  </RecommendedSearchItem>
                );
              })}
            </RecommendedSearchList>
          </>
        ) : (
          <NoneSearchResult>잠시만 기다려주세요</NoneSearchResult>
        )}
      </SearchResultBox>
    </>
  );
};

export default Search;
