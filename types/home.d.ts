export interface MainPageProps {
  data: SliderImage[];
  hashtagData: SliderImage[];
  hashContent: MainPageDataProps[];
  popularContent: MainPageDataProps[];
}

export type SliderImage = {
  id: number;
  src: string;
  alt: string;
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
  data: SliderImage[];
  $isClick?: boolean;
  onClickEvent?: any;
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
