import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
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
  selectedTitle: string;
  setSelectedTitle: React.Dispatch<React.SetStateAction<string>>;
  update: boolean;
  videoId: string;
}

const InputContainer = styled.div`
  position: relative;
  width: 600px;
`;

const ClearButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: #888;
  margin: 0;
  padding: 0;
`;

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

export const YouTubeSearch = ({
  setVideoId,
  selectedTitle,
  setSelectedTitle,
  update,
  videoId,
}: YouTubeSearchProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchSuggestions, setSearchSuggestions] = useState<Suggestion[]>([]);
  const [isInputActive, setIsInputActive] = useState(true);
  const [isSearchComplete, setIsSearchComplete] = useState(false);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    []
  );

  const searchYoutube = async (term: string) => {
    if (term.length >= 2) {
      const response = await axios.get(
        `http://localhost:3001/test/youtube/search`,
        {
          params: {
            term: term,
          },
        }
      );
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

  const debouncedSearchYoutube = useMemo(
    () => debounce(searchYoutube, 300),
    []
  );

  const handleKeyUp = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      const value = event.currentTarget.value;
      if (value.trim() === '') {
        setSearchSuggestions([]);
      } else {
        debouncedSearchYoutube(value);
      }
    },
    [debouncedSearchYoutube]
  );

  const handleSuggestionClick = useCallback(
    (suggestion: Suggestion) => {
      setIsInputActive(false);
      setSelectedTitle(suggestion.title);
      setVideoId(suggestion.url);
      setSearchSuggestions([]);
      setIsSearchComplete(true);
    },
    [setVideoId, setSelectedTitle]
  );

  const handleClear = useCallback(() => {
    setIsInputActive(true);
    setSearchTerm('');
    setSelectedTitle('');
    setVideoId('');
  }, [setSelectedTitle, setVideoId]);

  useEffect(() => {
    if (update && videoId !== '') {
      setIsInputActive(false);
    }
  }, [update, videoId]);

  useEffect(() => {
    if (videoId === '') {
      setIsSearchComplete(false);
      setIsInputActive(true);
      setSelectedTitle('');
      setSearchTerm('');
    }
  }, [update, videoId, setSelectedTitle]);

  return (
    <>
      {!isSearchComplete && (
        <InputContainer>
          <StyledAuthInput
            type="text"
            placeholder="음악 제목"
            value={isInputActive ? searchTerm : selectedTitle}
            onChange={handleChange}
            onKeyUp={isInputActive ? handleKeyUp : undefined}
            style={{ width: '100%', margin: '5px 0' }}
            disabled={!isInputActive}
          />
          {selectedTitle && !isInputActive && (
            <ClearButton onClick={handleClear}>X</ClearButton>
          )}
        </InputContainer>
      )}
      {isInputActive && (
        <SuggestionBox>
          {searchSuggestions.map((suggestion, index) => (
            <SuggestionItem
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
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
      )}
    </>
  );
};
