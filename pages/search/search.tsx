import React, { FormEvent, useState } from 'react';
import Header from '@/components/common/Header';
import MobileBottomNav from '@/components/common/MobileBottomNav';
import styled from 'styled-components';
import { Selecter } from '@/components/common/SelectUI';
import useInput from '@/hooks/useInput';
import Button from '@/components/common/Button';
import ImageContent from '@/components/Home/ImageContent';
import Footer from '@/components/common/Footer';
import { ImageContentsContainer } from '@/styles/imageContainer';
import { hashtagContentsImages } from '@/public/data';
const Main = styled.main`
  width: 100%;
  background-color: gray;
  .search-button {
    width: 200px;
  }
`;

const SearchForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 80%;
  height: 44px;
  padding: 20px 24px;
`;

const SelectBox = styled.div`
  width: 80%;
  height: 100px;
  background-color: gray;
`;

const selectOption = [
  { value: 'user', text: '유저' },
  { value: 'content', text: '게시글' },
  { value: 'tag', text: '태그' },
];
const Search = () => {
  const [search, searchHandler, setSearch] = useInput('');
  const [option, setOption] = useState<string>();
  const onSubmitSearchHandler = (e: FormEvent) => {
    e.preventDefault();
    alert(search + option);
  };

  return (
    <>
      <Header />
      <Main>
        <SearchForm onSubmit={onSubmitSearchHandler}>
          <Selecter selectOption={selectOption} setOption={setOption} />
          <SearchInput
            type="text"
            value={search}
            name="search"
            onChange={searchHandler}
          />
          <Button type="submit" className="search-button">
            검색
          </Button>
        </SearchForm>
        <SelectBox />
        <ImageContentsContainer>
          {hashtagContentsImages.map((result, idx) => {
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
      </Main>
      <Footer />
      <MobileBottomNav />
    </>
  );
};

export default Search;
