import React, { FormEvent, useState } from 'react';
import { Selecter } from '@/components/common/SelectUI';
import useInput from '@/hooks/useInput';
import IconButton from '@/components/common/IconButton';
import { hashtagContentsImages } from '@/public/data';
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

const SELECT_OPTION = [
  { value: 'user', text: '유저' },
  { value: 'content', text: '게시글' },
  { value: 'tag', text: '태그' },
];

const Search = () => {
  const [search, searchHandler, setSearch] = useInput('');
  const [option, setOption] = useState<string>('user');
  const data = hashtagContentsImages;
  const onSubmitSearchHandler = (e: FormEvent) => {
    e.preventDefault();
    if (search === '') {
      return alert('검색 내용을 입력해주세요');
    }
    alert(search + option);
  };

  return (
    <>
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
      {data ? (
        <SearchResult option={option} data={data} />
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