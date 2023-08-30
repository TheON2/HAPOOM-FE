import { styled } from 'styled-components';

export const FeedSection = styled.section`
  max-width: 768px;
  width: 100%;
  margin: 0 auto;
`;
export const FeedContainer = styled.div`
  max-width: 768px;
  width: 100%;
  margin: 0 auto;
  padding: 12px 24px 36px;
  border-bottom: 2px solid #efefef ;

`;
export const FeedHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 4px auto;
  position: relative;
  gap: 8px;
  div img {
    border-radius: 50%;
    width: 45px;
    height: 45px;
    margin: 0 auto;
  }
`;
export const FeedUserNickName = styled.div`
  color: #232323;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;
export const FeedTime = styled.div`
  color: #9e9e9e;
  font-size: 12px;
  font-weight: 400;
`;
export const FeedIcon = styled.div`
  position: absolute;
  right: 0;
`;
export const MainImageContainer = styled.div`
  width: 100%;
  padding-bottom: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    top: 0;
    left: 0;
  }
  @media (max-width: 768px) {
    height: 189px;
  }
`;
export const FeedTagLikeBox = styled.div`
  width: 100%;
  margin: 8px auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
`;
export const TagBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  gap: 6px;
  padding: 4px 0;
`;
export const FeedContentBox = styled.div`
  display: flex;
  @media (max-width: 520px) {
    flex-direction: column;
  }
`;
export const FeedContent = styled.p`
  margin-top: 4px;
  color: #000;
  font-size: 20;
  font-weight: 500;
  word-wrap: break-word;
`;
export const MoreButton = styled.button`
  margin-top: 4px;
  background-color: transparent;
  border: none;
  color: #000;
  cursor: pointer;
  @media (max-width: 520px) {
    text-align: left;
  }

`;
export const LikeIconContainer = styled.div`
  width: 50px;
  height: 40px;
  position: relative;
  bottom: 2px;
  left: 6px;
`;
