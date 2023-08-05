import { styled } from "styled-components";
import Image from "next/image";
import Link from "next/link";

export const UserPageSection = styled.section`
  max-width: 1440px;
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center;
  margin: 0 auto;
  @media (max-width: 500px) {
   padding: 0 20px; 
  }
`;
export const UserPageContainer = styled.div`
  width: 730px;
  p{
    font-family: Inter;
    font-size: 16px;
    font-weight: 700;
    text-align: left;
    margin-top: 20px;
  }
  @media (max-width: 500px) {
   padding: 0 20px; 
   width: 100%;
  }
`;
export const UserProfileCardBox = styled.div`
  width: 730px;
  display: flex;
  border: 1px solid black;
  @media (max-width: 500px) {
    width: 100%;
    flex-direction: column;
  }
`;
export const UserImage = styled(Image)`
width: 264px;
height: 280px;
object-fit: cover;
@media (max-width: 500px) {
    width: 100%;
  }
`
export const ProfileContentsBox = styled.div`
  margin-left: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;  
`;
export const FollowBox = styled.div`
  width: 300px;
  display: flex;
  gap: 10px;
  align-items: center;
  p{
    color: #C2C2C2;
  }
`;
export const SettingPageLink = styled(Link)`
  display: block;
  color: #C2C2C2;
  border: 1px solid black;
  border-radius: 5px; 
  font-family: Inter;
  font-size: 16px;
  font-weight: 700;
  margin-top: 20px;
  width: 53px;
  height: 24px;
  text-align: center;
  line-height: 1.5;
`;

export const LikePostSuggestionBox = styled.div`
width: 200px;
height:150px;
margin: 0 auto;
margin-top: 20px;
display: flex;
justify-content: center;
align-items: center;
gap: 15px;
`
export const ImageBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
p {
  text-align: center;
  font-family: Inter;
  font-size: 30px;
  margin: 5px 0;
}`

export const PostBox = styled.div`
  max-width: 726px;
`
export const PostContentBox = styled.div`
  position: relative;
  display: flex;
  gap: 15px;
`
export const PostParagraph = styled.p`
  text-align: center;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
`
export const Line = styled.div`
  margin: 10px 0;
  border-bottom: 1px solid black;
`
export const PostImageBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: flex-start ;
  align-items: center;
  @media (max-width: 500px) {
    width: 100%;
    justify-content: center;
  }
`;
export const PostImage = styled(Image)`
  width: 232px;
  height: 228px;
  object-fit: cover;
  position: relative;
`
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
  `
export const TabIndicator = styled.span<{ width: number; left: number }>`
  position: absolute;
  bottom: -12px; 
  height: 4px;
  transition: 0.4s;
  height: 5px;
  background-color: red;
  width: ${({ width }) => `${width}px`};
  left: ${({ left }) => `${left}px`};
  z-index: 1;
  border-radius: 8px 8px 0 0;
`