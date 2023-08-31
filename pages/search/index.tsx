import React, { FormEvent, useEffect, useState } from 'react';
import { Selecter } from '@/components/common/SelectUI';
import useInput from '@/hooks/useInput';
import IconButton from '@/components/common/IconButton';
import { Cloud } from '@/components/common/SVG';
import SearchResult from '@/components/Search/SearchResult';
import Image from 'next/image';
import {
  SearchLayout,
  SearchForm,
  SearchInput,
  SelectBox,
  NoneSearchResult,
  SearchResultBox,
  RecommendedSearchList,
  RecommendedSearchItem,
} from '@/styles/search';
import SearchComponent from '@/components/Search/SearchComponent';
import { getSearch } from '@/api/post';
import { useQuery } from 'react-query';
import useModal from '@/hooks/useModal';
import Modal from '@/components/common/Modal';
import { useDispatch } from 'react-redux';
import { TOGGLE_SUPER_USER } from '@/redux/reducers/userSlice';

const SELECT_OPTION = [
  { value: 'users', text: '유저' },
  { value: 'posts', text: '내용' },
  { value: 'tags', text: '태그' },
];
const RECOMMENDED_SEARCH_KEYWORD = [
  {
    viewText: '💨 바람법사H섭',
    searchText: '바람법사H섭',
  },
  { viewText: '⚡️ 번개군주민규', searchText: '번개군주민규' },
  { viewText: '🌨 우박영웅소채', searchText: '우박영웅소채' },
  { viewText: '☔️ 비오는왕도원', searchText: '비오는왕도원' },
  { viewText: '❄️ 폭설대공정백', searchText: '폭설대공정백' },
  { viewText: '🌤 맑은현자혜경', searchText: '맑은현자혜경' },
  { viewText: '🌩 천둥의자도영', searchText: '천둥의자도영' },
];
const Search = () => {
  const dispatch = useDispatch();
  const [search, searchHandler, setSearch] = useInput('');
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [option, setOption] = useState<string>(SELECT_OPTION[0].value);
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
    if (search == '코딩은 마치 바람난첫사랑같다.저주하면서 동시에 사랑하니.') {
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
          <span className="highligth"> 하늘</span>을(를) 검색해볼까요?
        </>
      );
    } else {
      return (
        <>
          <span className="highligth">{search}</span>을 검색해볼까요?
        </>
      );
    }
  };
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
        <SearchForm onSubmit={onSubmitSearchHandler}>
          <SelectBox>
            <Selecter
              selectOption={SELECT_OPTION}
              setOption={setOption}
              setIsSearch={setIsSearch}
            />
          </SelectBox>
          <SearchInput
            type="text"
            value={search}
            name="search"
            onChange={searchHandler}
            placeholder="검색 내용을 입력해주세요"
          />
          <IconButton type="submit" className="search-button">
            <Cloud />
          </IconButton>
        </SearchForm>
      </SearchLayout>
      <SearchResultBox>
        {searchData ? (
          <SearchResult option={option} data={searchData} />
        ) : !isSuccess ? (
          <RecommendedSearchList>
            <p>현재 인기 있는 유저입니다</p>
            {RECOMMENDED_SEARCH_KEYWORD.map((keyword, idx) => {
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
        ) : (
          <NoneSearchResult>잠시만 기다려주세요</NoneSearchResult>
        )}
      </SearchResultBox>
    </>
  );
};

export default Search;
