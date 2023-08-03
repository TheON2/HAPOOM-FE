import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import styled from 'styled-components';
import { StyledAuthInput } from '@/styles/write';
import Image from 'next/image';

interface Suggestion {
  title: string;
  url: string;
  thumbnail: string;
}

interface YouTubeSearchProps {
  setVideoId: React.Dispatch<React.SetStateAction<string>>;
}

const SuggestionBox = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 600px;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
  text-align: left;
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
        response.data.map((item: any) => {
          return {
            title: item.title,
            url: `https://www.youtube.com/watch?v=${item.videoId}`,
            thumbnail: item.thumbnail,
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
            <Image
              src={suggestion.thumbnail}
              alt={suggestion.title}
              style={{ marginRight: '10px' }}
              width={100}
              height={100}
            />
            {suggestion.title}
          </SuggestionItem>
        ))}
      </SuggestionBox>
    </>
  );
};
