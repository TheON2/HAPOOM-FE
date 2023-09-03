import { styled } from 'styled-components';

type TagProps = {
  justifyContent: string;
};

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
  border-bottom: var(--feed-border);
`;
export const FeedHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 4px auto 8px auto;
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
  color: var(--text-color);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;
export const FeedTime = styled.div`
  color: var(--text-time-color);
  font-size: 12px;
  font-weight: 400;
`;
export const FeedIcon = styled.div`
  position: absolute;
  right: 0;
  top: 20px;
`;
export const MainImageContainer = styled.div`
  width: 100%;
  padding-bottom: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  border-radius: 20px;
  cursor: pointer;
  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    top: 0;
    left: 0;
    margin-bottom: 8px;
  }
  @media (max-width: 768px) {
    height: 189px;
  }
`;
export const FeedTagLikeBox = styled.div<TagProps>`
  width: 100%;
  margin: 8px auto;
  justify-content: ${(props) => props.justifyContent};
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
  flex-wrap: wrap;
`;
export const LikeIconContainer = styled.div`
  width: 50px;
  height: 40px;
  position: relative;
  bottom: 2px;
  left: 6px;
`;
