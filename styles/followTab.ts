import styled from 'styled-components';

export const FollowContainer = styled.div`
  width: 100%;
`;

export const TabContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  display: flex;
  position: relative; // TabUnderline의 위치를 위해 필요합니다.
  border-bottom: 1px solid #c2c2c2; // 이 줄을 추가합니다.
  padding-left: 24px;
  padding-right: 24px;

  @media screen and (max-width: 768px) {
    gap: 90px; // 태블릿 및 모바일 화면에서의 간격을 조절합니다.
  }

  @media screen and (max-width: 480px) {
    gap: 50px; // 모바일 화면에서의 간격을 조절합니다.
  }
`;

export const TabButton = styled.button`
  padding: 10px 20px;
  font-size: 18px;
  font-weight: 700;
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #007bff;
  }
`;

export const UserList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const UserListItemStyled = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

export const UserProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
  border: 1px solid black;
  background-color: black;
`;

export const UserInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-right: 15px;
`;

export const Nickname = styled.strong`
  font-size: 18px;
  margin-bottom: 3px;
`;

export const Email = styled.p`
  font-size: 14px;
  font-weight: 300;
  color: #777;
`;

export const FollowButtonStyled = styled.button`
  font-size: 14px;
  width: 65px;
  height: 36px;
  border: none;
  padding: 5px 10px;
  background-color: #2797ff;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

type TabUnderlineProps = {
  activeTab: 'followers' | 'followings';
};

export const TabUnderline = styled.div.attrs<TabUnderlineProps>((props) => ({
  activeTab: props.activeTab,
}))`
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 50%;
  height: 3px;
  background-color: #2797ff;

  transition: transform 0.3s ease-in-out;

  transform: ${(props) =>
    props.activeTab === 'followers' ? 'translateX(0%)' : 'translateX(100%)'};
`;
