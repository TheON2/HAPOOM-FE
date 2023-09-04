import React from 'react';
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
import IconButton from '@/components/common/IconButton';
import { Selecter } from '@/components/common/SelectUI';
import { Cloud } from '@/components/common/SVG';

import {
  SELECT_OPTION,
  // RECOMMENDED_KEYWORD_USER,
  // RECOMMENDED,
  // SUPER_KEYWORD,
} from '@/components/Search/searchData';
type searchFormProps = {
  setOption: any;
  setIsSearch: any;
  search: any;
  searchEvent: any;
  submitEvent: any;
};
const SearchFormComponent = ({
  setOption,
  setIsSearch,
  search,
  searchEvent,
  submitEvent,
}: searchFormProps) => {
  return (
    <SearchForm onSubmit={submitEvent}>
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
        onChange={searchEvent}
        placeholder="검색 내용을 입력해주세요"
      />
      <IconButton type="submit" className="search-button">
        <Cloud />
      </IconButton>
    </SearchForm>
  );
};

export default SearchFormComponent;
