import React, { Dispatch, SetStateAction } from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react';
import TagInput from '@/components/Write/TagInput';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import SocialSuccess from '@/pages/auth/SocialSuccess';
import ContentArea from '@/components/Write/ContentArea';
import CustomButton from '@/components/Write/CustomButton';
import axios from 'axios';
import { YouTubeSearch } from '@/components/Write/YoutubeSearchInput';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

jest.mock('axios');

describe('YouTubeSearch', () => {
  let mockSetVideoId: Dispatch<SetStateAction<string>>;
  let mockSetSelectedTitle: Dispatch<SetStateAction<string>>;

  beforeEach(() => {
    mockSetVideoId = jest.fn();
    mockSetSelectedTitle = jest.fn();
    (axios.get as jest.Mock).mockResolvedValue({ data: [] });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(
      <YouTubeSearch
        setVideoId={mockSetVideoId}
        setSelectedTitle={mockSetSelectedTitle}
        update="1"
        videoId=""
      />
    );
  });

  it('searches YouTube when typing in the input', async () => {
    const mockResponse = {
      data: [
        {
          thumbnail: 'https://i.ytimg.com/vi/1-Lm2LUR8Ss/default.jpg',
          title: '버즈(Buzz) - 가시 [가사/Lyrics]',
          videoId: '1-Lm2LUR8Ss',
        },
      ],
    };
    (axios.get as jest.Mock).mockResolvedValue({ mockResponse });

    const { getByPlaceholderText } = render(
      <YouTubeSearch
        setVideoId={mockSetVideoId}
        setSelectedTitle={mockSetSelectedTitle}
        update="1"
        videoId=""
      />
    );

    const input = getByPlaceholderText('Youtube 검색하기');

    await act(async () => {
      fireEvent.change(input, { target: { value: 'Test' } });
      await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(0));
    });
  });

  it('selects a suggestion and sets the videoId and title', async () => {
    const mockResponse = {
      data: [
        {
          thumbnail: 'https://i.ytimg.com/vi/1-Lm2LUR8Ss/default.jpg',
          title: '버즈(Buzz) - 가시 [가사/Lyrics]',
          videoId: '1-Lm2LUR8Ss',
        },
      ],
    };
    (axios.get as jest.Mock).mockResolvedValue({ mockResponse });

    const { getByPlaceholderText, getByText } = render(
      <YouTubeSearch
        setVideoId={mockSetVideoId}
        setSelectedTitle={mockSetSelectedTitle}
        update="1"
        videoId=""
      />
    );

    const input = getByPlaceholderText('Youtube 검색하기');

    await act(async () => {
      fireEvent.change(input, { target: { value: '버즈 가시' } });
      await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(0));
    });

    const regex = /버즈\(Buzz\) - 가시 \[가사\/Lyrics\]/;
    const suggestionItem = getByText(regex);
    fireEvent.click(suggestionItem);

    expect(mockSetSelectedTitle).toHaveBeenCalledWith(
      '버즈(Buzz) - 가시 [가사/Lyrics]'
    );
    expect(mockSetVideoId).toHaveBeenCalledWith(
      'https://www.youtube.com/watch?v=1-Lm2LUR8Ss'
    );
  });
});

describe('ContentArea Component', () => {
  it('should not allow more than 140 characters', () => {
    const setContentMock = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <ContentArea content="" setContent={setContentMock} />
    );

    const textArea = getByPlaceholderText(
      '문구를 입력해주세요'
    ) as HTMLTextAreaElement;

    // 150자의 텍스트를 입력해본다
    fireEvent.change(textArea, { target: { value: 'A'.repeat(140) } });

    // 내용이 제대로 설정되었는지 확인한다
    expect(setContentMock).toBeCalledWith('A'.repeat(140));
    expect(textArea.value).toBe('A'.repeat(0));

    // 제한 문자 수 메시지가 제대로 표시되는지 확인한다
    const limitMessage = getByText('0/140');
    expect(limitMessage).toBeInTheDocument();
  });
});

describe('<SocialSuccess />', () => {
  it('redirects to the main page if token exists', () => {
    const mockPush = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({
      query: {
        token: 'testToken',
      },
      push: mockPush,
    });

    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);

    act(() => {
      render(<SocialSuccess />);
    });

    // 로컬 스토리지에 토큰이 있는지 확인합니다.
    expect(window.localStorage.getItem('token')).toBe('testToken');

    // 메인 페이지로 이동하는지 확인합니다.
    expect(mockPush).toHaveBeenCalledWith('/');
  });
});

test('Maximum tags limit reached - should not add a sixth tag', () => {
  const setTags = jest.fn();
  const { getByPlaceholderText } = render(
    <TagInput
      tags={['tag1', 'tag2', 'tag3', 'tag4', 'tag5']}
      setTags={setTags}
    />
  );
  const inputElement = getByPlaceholderText('태그를 입력해주세요');

  // 여섯 번째 태그 추가 시도
  fireEvent.change(inputElement, { target: { value: 'newTag' } });
  fireEvent.keyDown(inputElement, { key: 'Enter' });

  // setTags가 호출되지 않았는지 확인
  expect(setTags).not.toHaveBeenCalledWith([
    'tag1',
    'tag2',
    'tag3',
    'tag4',
    'tag5',
    'newTag',
  ]);
});

test('Maximum tags limit not reached - no error displayed', () => {
  const setTags = jest.fn();
  const { getByPlaceholderText, queryByText } = render(
    <TagInput tags={['tag1', 'tag2', 'tag3']} setTags={setTags} />
  );
  const inputElement = getByPlaceholderText('태그를 입력해주세요');

  fireEvent.change(inputElement, { target: { value: 'testTag4' } });
  fireEvent.keyDown(inputElement, { key: 'Enter' });

  const limitExceededMessage = queryByText(
    '태그는 최대 5까지 업로드할 수 있습니다.'
  );
  expect(limitExceededMessage).not.toBeInTheDocument();
});

describe('CustomButton component', () => {
  it('should have default styles', () => {
    const { getByRole } = render(<CustomButton>Test</CustomButton>);
    const button = getByRole('button');

    expect(button).toHaveStyle('color: rgb(255, 255, 255)');
    expect(button).toHaveStyle('background-color: rgb(39, 151, 255)');
  });

  it('should change styles when $addStyle prop is passed', () => {
    const { getByRole } = render(
      <CustomButton $addStyle={true}>Test</CustomButton>
    );
    const button = getByRole('button');

    expect(button).toHaveStyle('color: rgb(39, 151, 255)');
  });
});
