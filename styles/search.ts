import styled from 'styled-components';

export const SearchLayout = styled.main`
  width: 100%;
  padding: 46px 24px 20px;

  .search-button {
    width: 32px;
    height: 32px;
    background-color: #5bb0ff;
    border-radius: 18px;
    transform: translateX(0);
    transition: all 0.2s ease-out;
    svg {
      fill: #fff;
    }
    &:hover {
      background-color: #0988ff;
    }
    &:active {
      filter: brightness(0.7);
    }
  }
  .keyword {
    font-size: 16px;
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

export const SearchForm = styled.form`
  display: flex;
  width: 100%;
  height: 46px;
  padding: 12px 5px;
  margin: 0 auto 36px;
  /* flex-direction: column; */
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
  background-color: var(--search-bg-color);
  border: 1px solid #5bb0ff;
  border-radius: 30px;
  box-shadow: 0 5px 8px #3a51661f;
  position: relative;
`;

export const SearchInput = styled.input`
  width: calc(100% - 106px);
  height: 36px;
  padding: 8px 16px;
  border-radius: 22px;
  border: none;
  font-size: 14px;
  transition: all 0.3s ease-in-out;
  background: none;
  &:focus {
    outline: none;
    background-color: #eef7ff20;
  }
`;

export const SelectBox = styled.div`
  width: 80px;
  height: 36px;
  position: relative;
`;

export const NoneSearchResult = styled.div`
  width: 100%;
  height: 60svh;
  color: #c4c4c4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 30px;
  gap: 30px;
`;
export const RecommendedSearchList = styled.ul`
  max-width: 768px;
  padding: 0 24px;
  width: 100%;
  text-align: center;
  p {
    color: var(--primary-color);
    font-weight: 700;
    margin-bottom: 20px;
  }
`;
export const RecommendedSearchItem = styled.li`
  width: 80%;
  margin: 0 auto;
  padding: 12px 24px;
  border-radius: 30px;
  font-size: 15px;
  margin-bottom: 12px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: var(--detail-bg-color);
  }
`;
export const SearchResultBox = styled.div`
  width: 100%;
  min-height: 60vh;
`;
