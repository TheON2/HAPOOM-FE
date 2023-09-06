export const SELECT_OPTION = [
  { value: 'users', text: '닉네임' },
  { value: 'posts', text: '내용' },
  { value: 'tags', text: '태그' },
];
export const RECOMMENDED_KEYWORD_USER = [
  {
    viewText: '💨 바람법사H섭',
    searchText: '바람법사H섭',
  },
  { viewText: '⚡️ 번개군주민규', searchText: '번개군주민규' },
  { viewText: '🌨 우박영웅소채', searchText: '우박영웅소채' },
  { viewText: '☔️ 비오는왕도원', searchText: '비오는왕도원' },
  { viewText: '❄️ 폭설대공정백', searchText: '폭설대공정백' },
  { viewText: '🌤 맑은현자혜경', searchText: '맑은현자혜경' },
  { viewText: '🌩 천둥의자도영', searchText: '천둥의자도영' },
];
export const RECOMMENDED_KEYWORD_CONTENT = [
  {
    viewText: '🏞 하늘',
    searchText: '하늘',
  },
  { viewText: '🌕 슈퍼문', searchText: '슈퍼문' },
  { viewText: '🌅 노을', searchText: '노을' },
  { viewText: '🌉 밤하늘', searchText: '밤하늘' },
];
export const RECOMMENDED_KEYWORD_TAG = [
  {
    viewText: '#하늘',
    searchText: '하늘',
  },
  { viewText: '#슈퍼문', searchText: '슈퍼문' },
  { viewText: '#노을', searchText: '노을' },
  { viewText: '#밤하늘', searchText: '밤하늘' },
];
export const RECOMMENDED = [
  {
    category: 'users',
    data: RECOMMENDED_KEYWORD_USER,
  },
  {
    category: 'posts',
    data: RECOMMENDED_KEYWORD_CONTENT,
  },
  {
    category: 'tags',
    data: RECOMMENDED_KEYWORD_TAG,
  },
];
export const SUPER_KEYWORD =
  '코딩은 마치 바람난첫사랑같다.저주하면서 동시에 사랑하니.';
