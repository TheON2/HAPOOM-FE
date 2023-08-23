import { styled } from "styled-components";

export const FeedSection = styled.section`
  width: 320px;
  margin: 0 auto;
`
export const FeedContainer = styled.div`
  width:100%;
  border: 1px solid #FF3434;
  margin: 0 auto;
`
export const FeedHeader = styled.div`
  width: 272px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 4px auto;
  position: relative;
  gap: 4px;
  div img{
    border-radius: 50%;
    width: 33px;
    height: 33px;
    margin: 0 auto;
  } 
`
export const FeedUserNickName = styled.div`
  color: #232323;
  font-size: 16px;
  font-weight: 600;
`
export const FeedTime = styled.div`
  color: #9E9E9E;
  font-size: 12px;
  font-weight: 400;
`
export const FeedIcon = styled.div`
  position: absolute;
  right: 0;
`
export const MainImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  overflow: hidden;
`
export const FeedMusicLikeBox = styled.div`
  width: 272px;
  margin: 8px auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
`
export const MusicBox = styled.div`
  width: 220px;
  height: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 20px;
  border: 1px solid #DFEFFF;
  background: #EFF7FF;
  position: relative;
  gap: 4px;
  padding: 12px 8px;
`
export const Equalizer = styled.div`
  position: absolute;
  right: 0;
`
export const LikeIconContainer = styled.div`
  width: 50px;
  height: 40px;
  position: relative;
  bottom: 2px;
  left: 6px;
`

