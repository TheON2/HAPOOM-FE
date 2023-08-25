import React, { FormEvent, useState } from 'react';
import { Selecter } from '@/components/common/SelectUI';
import useInput from '@/hooks/useInput';
import IconButton from '@/components/common/IconButton';
import { sliderImages } from '@/public/data';
import { Cloud } from '@/components/common/SVG';
import SearchResult from '@/components/Search/SearchResult';
import Image from 'next/image';
import {
  SearchLayout,
  SearchForm,
  SearchInput,
  SelectBox,
  NoneSearchResult,
} from '@/styles/search';
import SearchComponent from '@/components/Search/SearchComponent';
import { getSearch } from '@/api/post';
import { useQuery, useQueryClient } from 'react-query';

const SELECT_OPTION = [
  { value: 'users', text: '유저' },
  { value: 'posts', text: '게시글' },
  { value: 'tags', text: '태그' },
];

const Search = () => {
  const [search, searchHandler, setSearch] = useInput('');
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [option, setOption] = useState<string>(SELECT_OPTION[0].value);

  const queryClient = useQueryClient();
  const data = sliderImages;

  const onSubmitSearchHandler = (e: FormEvent) => {
    e.preventDefault();
    if (search === '') {
      return alert('검색 내용을 입력해주세요');
    }
    setIsSearch(true);
  };

  const { data: searchData } = useQuery(
    ['searchResults', option],
    () => getSearch({ search, option }),
    {
      enabled: isSearch,
      onSuccess: () => {
        setIsSearch(false);
        console.log('요청');
      },
    }
  );
  return (
    <>
      <SearchComponent />
      <SearchLayout>
        <p className="keyword">
          {search === '' ? (
            <>
              오늘은 어떤 <span className="highligth">하늘</span>을
              검색해볼까요?
            </>
          ) : (
            <>
              <span className="highligth">{search}</span>에 대한 결과입니다.
            </>
          )}
        </p>
        <SearchForm onSubmit={onSubmitSearchHandler}>
          <SelectBox>
            <Selecter selectOption={SELECT_OPTION} setOption={setOption} />
          </SelectBox>
          <SearchInput
            type="text"
            value={search}
            name="search"
            onChange={searchHandler}
          />
          <IconButton type="submit" className="search-button">
            <Cloud />
          </IconButton>
        </SearchForm>
      </SearchLayout>
      {searchData ? (
        <SearchResult option={option} data={searchData} />
      ) : (
        <NoneSearchResult>
          <Image
            src={'/movecloud.gif'}
            alt="move cloud gif image"
            width={100}
            height={100}
          />
          검색 결과가 없습니다. <br />더 넓은 하늘을 구경해봐요
        </NoneSearchResult>
      )}
    </>
  );
};

export default Search;
