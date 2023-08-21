import styled from 'styled-components';

export const FollowContainer = styled.div`
  width: 100%;
`;

export const TabContainer = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 20px;
  display: flex;
  position: relative;
  border-bottom: 1px solid #c2c2c2;
`;

export const TabButton = styled.button`
  width: 100%;
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
  width: 100%;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  margin-bottom: 32px;
  .button-follow {
    width: 20%;
  }
`;

export const UserProfileImage = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  /* margin-right: 10px; */
  /* border: 1px solid black; */
  background-color: black;
  overflow: hidden;
`;

export const UserInfo = styled.div`
  width: 70%;
  flex: 1;
  display: flex;
  flex-direction: column;
  line-height: 18px;
  /* margin-right: 15px; */
  text-align: start;
`;

export const Nickname = styled.p`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 3px;
  color: #333;
`;

export const Email = styled.p`
  font-size: 14px;
  font-weight: 400;
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
  $activeTab: 'followers' | 'followings';
};

export const TabUnderline = styled.div<TabUnderlineProps>`
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 50%;
  height: 3px;
  background-color: #2797ff;

  transition: transform 0.3s ease-in-out;

  transform: ${(props) =>
    props.$activeTab === 'followers' ? 'translateX(0%)' : 'translateX(100%)'};
`;
