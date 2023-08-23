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
`;
export const UserProfileCardBox = styled.div`
  margin: auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;

  img {
    border-radius: 50%;
    width: 60px;
    height: 60px;
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

  .nickName {
    font-size: 20px;
  }
`;

export const FollowBox = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  p {
    font-size: 16px;
    color: #c2c2c2;
  }
`;
export const SettingPageLink = styled(Link)`
  display: block;
  color: #0084ff;
  border: 1px solid #0084ff;
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
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;

export const InfoText = styled.div`
  font-size: 12px;
  font-weight: 700;
`;

export const InfoNumber = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #0084ff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  svg {
    width: 40px;
    height: 40px;
  }

  p {
    text-align: center;
    font-family: Inter;
    margin: 5px 0;
  }
`;

export const PostBox = styled.div`
  text-align: center;
  margin: auto;
`;
export const PostContentBox = styled.div`
  position: relative;
  display: flex;
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

export const UserImageContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  height: 100%;

  img {
    height: 100%;
    width: 100%;
    overflow: hidden;
    object-fit: cover;
  }
`;

export const PostImage = styled(Image)`
  width: 232px;
  height: 228px;
  object-fit: cover;
  position: relative;
`;
export const TabContainer = styled.div`
  display: flex;
  width: 100%;
`;
export const TabButton = styled.div`
  flex: 1;

  padding: 12px;
  color: #83818c;
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
export const TabIndicator = styled.span<{ width: number; $left: number }>`
  position: absolute;
  bottom: -13px;
  height: 3px;
  transition: 0.2s;
  height: 5px;
  background-color: #2797ff;
  width: ${({ width }) => `${width}px`};
  left: ${({ $left }) => `${$left}px`};
  z-index: 1;
`;

interface ButtonProps {
  $status: '팔로우' | '팔로잉' | '언팔로우' | '설정';
}

export const FollowBtn = styled.div<ButtonProps>`
  max-width: 300px;
  width: 100%;
  border: none;
  margin: 0 auto;
  padding: 8px 0;
  text-align: center;
  border: none;
  font-weight: 700px;
  border-radius: 3px;
  box-shadow: 1px 2px 3px 0px rgba(0, 0, 0, 0.3);

  background-color: ${({ $status }) => {
    switch ($status) {
      case '팔로우':
        return '#2797ff';
      case '팔로잉':
        return '#D9D9D9';
      case '언팔로우':
        return '#FF6666';
      case '설정':
        return '#2797ff';
      default:
        return '#2797ff';
    }
  }};
  color: white;
`;

export const SettingBtn = styled.div`
  width: 100%;
  text-align: center;
  button {
    width: 251px;
    height: 36px;
    border: none;
    color: white;
    font-weight: 700px;
    border-radius: 3px;
    background-color: #2797ff;
    box-shadow: 1px 2px 3px 0px rgba(0, 0, 0, 0.3);

    &:hover {
      cursor: pointer;
    }
  }
`;
