export type FeedData = {
  id: number;
  userImage: string;
  userNickname: string;
  src: string;
  alt: string;
  musicSinger: string;
  musicTitle: string;
  time: string;
};

export const feedData: FeedData[] = 
[
  {
    id: 1,
    userImage: '/b1.png',
    userNickname: '닉네임이다',
    src: '/c5.jpeg',
    alt: '이미지데이터',
    musicSinger: '버즈',
    musicTitle: '가시',
    time: '7시에용'
  }
];