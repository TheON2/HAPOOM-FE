import React, { FormEvent, useState } from 'react';
// import Header from '@/components/common/Header';
import MobileBottomNav from '@/components/common/MobileBottomNav';
import styled from 'styled-components';
import { Selecter } from '@/components/common/SelectUI';
import useInput from '@/hooks/useInput';
import Button from '@/components/common/Button';
import IconButton from '@/components/common/IconButton';
import ImageContent from '@/components/Home/ImageContent';
import { ImageContentsContainer } from '@/styles/imageContainer';
import { hashtagContentsImages } from '@/public/data';
import { Cloud } from '@/components/common/SVG';
import Image from 'next/image';
import GIF from '/movecloud.gif';
const SearchLayout = styled.main`
  width: 100%;
  padding: 80px 24px 20px;
  .search-button {
    width: 32px;
    height: 32px;
    background-color: #5bb0ff;
    border-radius: 18px;
    transform: translateX(0);
    svg {
      fill: #fff;
    }
  }
  .keyword {
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    padding: 0px 0 20px;
    margin: 0px 0 20px;
    &::after {
      content: '';
      display: block;
      width: 120px;
      height: 2px;
      margin: 0 auto;
      transform: translateY(20px);
      background-color: #dcd8d8;
    }
    .highligth {
      color: #0084ff;
    }
  }
`;

const SearchForm = styled.form`
  display: flex;
  width: 100%;
  height: 46px;
  padding: 12px 5px;
  margin: 0 auto 36px;
  /* flex-direction: column; */
  justify-content: space-between;
  align-items: center;
  gap: 4px;
  background-color: #fff;
  border: 1px solid #5bb0ff;
  border-radius: 30px;
  box-shadow: 0 5px 8px #3a51661f;
  position: relative;
`;

const SearchInput = styled.input`
  width: 60%;
  height: 36px;
  padding: 8px 16px;
  border-radius: 22px;
  border: none;
  font-size: 12px;
  &:focus {
    outline: none;
  }
`;

const SelectBox = styled.div`
  width: 80px;
  height: 36px;
  position: relative;
`;

const NoneSearchResult = styled.div`
  width: 100%;
  height: 70vh;
  color: #c4c4c4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 30px;
  gap: 30px;
`;

const selectOption = [
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
      {/* <Header /> */}
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
            <Selecter selectOption={selectOption} setOption={setOption} />
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

      <Footer />
    </>
  );
};

export default Search;

type searchProps = {
  option: string;
  data: any;
};

const SearchResult = ({ option, data }: searchProps) => {
  switch (option) {
    case 'user':
      return <div>user</div>;
    case 'content':
      return (
        <ImageContentsContainer>
          {data.map((result, idx) => {
            return (
              <ImageContent
                key={idx}
                src={result.src}
                alt={result.alt}
                postId={idx}
              />
            );
          })}
        </ImageContentsContainer>
      );
    case 'tag':
      return (
        <ImageContentsContainer>
          {data.map((result, idx) => {
            return (
              <ImageContent
                key={idx}
                src={result.src}
                alt={result.alt}
                postId={idx}
              />
            );
          })}
        </ImageContentsContainer>
      );
    default:
      return <NoneSearchResult>검색 결과가 없습니다</NoneSearchResult>;
  }
};
