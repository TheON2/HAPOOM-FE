import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import styled from 'styled-components';
import { StyledAuthInput } from '@/styles/write';

interface Suggestion {
  title: string;
  url: string;
}

interface YouTubeSearchProps {
  setVideoId: React.Dispatch<React.SetStateAction<string>>;
}

const SuggestionBox = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 300px; // 원하는 너비로 설정
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
`;

const SuggestionItem = styled.li`
  padding: 10px;
  background-color: white;
  border-bottom: 1px solid #f1f1f1;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
  &:last-child {
    border-bottom: none;
  }
`;

export const YouTubeSearch = ({ setVideoId }: YouTubeSearchProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchSuggestions, setSearchSuggestions] = useState<Suggestion[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const searchYoutube = async (term: string) => {
    if (term.length >= 2) {
      const response = await axios.get(`http://localhost:3001/youtube/search`, {
        params: {
          term: term,
        },
      });
      setSearchSuggestions(
        response.data.items.map((item: any) => {
          return {
            title: item.snippet.title,
            url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
          };
        })
      );
    }
  };

  const debouncedSearchYoutube = debounce(searchYoutube, 100);

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    if (value.trim() === '') {
      setSearchSuggestions([]);
    } else {
      debouncedSearchYoutube(value);
    }
  };

  const handleSuggestionClick = (url: string) => {
    setVideoId(url);
    setSearchSuggestions([]);
  };

  return (
    <>
      <StyledAuthInput
        type="text"
        placeholder="음악 제목"
        value={searchTerm}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        style={{ width: '600px' }}
      />
      <SuggestionBox>
        {searchSuggestions.map((suggestion, index) => (
          <SuggestionItem
            key={index}
            onClick={() => handleSuggestionClick(suggestion.url)}
          >
            {suggestion.title}
          </SuggestionItem>
        ))}
      </SuggestionBox>
    </>
  );
};
