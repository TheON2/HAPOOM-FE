import styled from 'styled-components';

export const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export const TabButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #007bff;
  }
`;

export const UserList = styled.div`
  display: flex;
  flex-direction: column;
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
  margin-right: 15px;
`;

export const UserInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-right: 15px;
`;

export const Nickname = styled.strong`
  font-size: 18px;
  margin-bottom: 5px;
`;

export const Email = styled.p`
  font-size: 14px;
  color: #777;
`;

export const FollowButtonStyled = styled.button`
  padding: 8px 15px;
  border: none;
  background-color: #007bff;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;
