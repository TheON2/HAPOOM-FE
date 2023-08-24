export interface MainPageProps {
  data: SliderImage[];
  hashtagData: HashtagDataProps[];
  hashContent: MainPageDataProps[];
  popularContent: MainPageDataProps[];
  serverProps: any;
  randomPosts: any;
}

export type SliderImage = {
  id: number;
  src: string;
  alt: string;
};
export type HashtagDataProps = {
  postId: number;
  image: string;
  private: boolean;
  tag: string;
  tagId: number;
};

export interface MainPageDataProps {
  image: string;
  nickname: string;
  postId: number;
  private: boolean;
  tag: string;
  updatedAt: string;
}

export type ImageContentProps = Pick<MainPageDataProps, 'postId' | 'image'>;

export type HashtagNavBarProps = {
  data: HashtagDataProps[];
  $isClick?: boolean;
  onClickEvent?: any;
  setHashTag: any;
};

export type ImageContentProps = Pick<MainPageDataProps, 'postId' | 'image'>;

export type ImageProps = {
  src: string;
  alt: string;
  postId: number;
};

export interface CarouselProps {
  children: React.ReactNode;
  $active: number;
}

export interface populerCarouselProps {
  data: MainPageDataProps[];
}

export interface BannerSliderProps {
  userId: number;
  postId: number;
  url: string;
  updatedAt: string;
  createdAt: string;
}
