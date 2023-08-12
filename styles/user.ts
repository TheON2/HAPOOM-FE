import { styled } from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';

export const UserPageSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  @media screen and (max-width: 1260px) {
  }
`;
export const UserPageContainer = styled.div`
  width: 100%;

  p {
    font-family: Inter;
    font-size: 16px;
    font-weight: 700;
    text-align: left;
    /* margin-top: 20px; */
  }

  @media screen and (max-width: 1260px) {
  }
`;
export const UserProfileCardBox = styled.div`
  margin: auto;
  width: 90%;
  display: flex;
  align-items: center;
  border: 1px solid black;
  justify-content: center;

  @media screen and (max-width: 1260px) {
    padding: 24px;
  }

  img {
    border-radius: 50%;
    height: 51px;
  }
`;
export const UserImage = styled(Image)`
  width: 441px;
  height: 280px;
  object-fit: cover;
`;
export const ProfileContentsBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 왼쪽 정렬 */
  width: 200px;
  padding-left: 17px; /* 왼쪽 여백 추가 */
  gap: 12px;

  @media screen and (max-width: 500px) {
    width: 70%;
  }
`;

export const NicknameBox = styled.div`
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
  justify-content: center; /* 내부 내용 중앙 정렬 */
  gap: 10px; /* 닉네임과 설정 링크 사이의 간격 */
`;

export const FollowBox = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;
  p {
    font-size: 16px;
    color: #c2c2c2;
  }
`;
export const SettingPageLink = styled(Link)`
  display: block;
  color: #c2c2c2;
  border: 1px solid black;
  border-radius: 5px;
  font-family: Inter;
  font-size: 16px;
  font-weight: 700;
  width: 53px;
  height: 24px;
  text-align: center;
  line-height: 1.5;
  margin-left: auto; /* 설정 링크를 오른쪽으로 정렬 */
`;

export const LikePostSuggestionBox = styled.div`
  width: 200px;
  height: 150px;
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;
export const ImageBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    text-align: center;
    font-family: Inter;
    font-size: 30px;
    margin: 5px 0;
  }
`;

export const PostBox = styled.div`
  max-width: 320px;
`;
export const PostContentBox = styled.div`
  position: relative;
  display: flex;
  gap: 14px;
`;
export const PostParagraph = styled.p`
  text-align: center;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
`;
export const Line = styled.div`
  margin: 10px 0;
  border-bottom: 1px solid black;
`;
export const PostImageBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: flex-start;
  align-items: center;
  @media (max-width: 1260px) {
    width: 100%;
    justify-content: center;
  }
`;
export const PostImage = styled(Image)`
  width: 232px;
  height: 228px;
  object-fit: cover;
  position: relative;
`;
export const TabButton = styled.div`
  color: #83818c;
  padding: 20px;
  text-decoration: none;
  cursor: pointer;
  transition: 0.3s;
  margin: 0 6px;
  z-index: 1;
  font-family: 'DM Sans', sans-serif;
  font-weight: 500;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 0;
    width: 100%;
    height: 5px;
    background-color: #dfe2ea;
    border-radius: 8px 8px 0 0;
    opacity: 0;
    transition: 0.3s;
  }
`;
export const TabIndicator = styled.span<{ width: number; left: number }>`
  position: absolute;
  bottom: -13px;
  height: 4px;
  transition: 0.4s;
  height: 5px;
  background-color: #0084ff;
  width: ${({ width }) => `${width}px`};
  left: ${({ left }) => `${left}px`};
  z-index: 1;
`;
