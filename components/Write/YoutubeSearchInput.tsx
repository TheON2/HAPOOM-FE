import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import styled from 'styled-components';

const SuggestionBox = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 300px;
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

interface YouTubeSearchInputProps {
  onSelected: (url: string) => void;
}

const YouTubeSearchInput: React.FC<YouTubeSearchInputProps> = ({
  onSelected,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const searchYoutube = async (term: string) => {
    if (term.length >= 2) {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search`,
        {
          params: {
            part: 'snippet',
            maxResults: 5,
            key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
            q: term,
            type: 'video',
          },
        }
      );
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
    onSelected(url);
    setSearchSuggestions([]);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="음악 제목"
        value={searchTerm}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
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
    </div>
  );
};

export default YouTubeSearchInput;
