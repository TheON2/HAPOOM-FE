import styled from 'styled-components';

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContainer = styled.div`
  width: 258px;
  background-color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;

  textarea {
    width: 100%;
    height: 141px;
    padding: 15px;
    border: 1px solid #0084ff;
    border-radius: 5px;
    margin-bottom: 10px;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center; // 아이템들을 중앙에 정렬
  justify-content: space-between; // 아이템들을 양쪽 끝으로 밀어줌
`;

export const Title = styled.h2`
  display: flex;
  font-size: 16px;
  color: #333;
  width: 70%;
`;

export const Content = styled.p`
  font-size: 16px;
  color: #666;
`;

export const Buttons = styled.div`
  display: flex;
  gap: 10px;
`;

export const CancelButton = styled.button`
  font-size: 12px;
  width: 60px;
  height: 40px;
  background-color: #b9b9b9;
  border: none;
  border-radius: 5px;
  padding: 5px 5px;
  cursor: pointer;
  color: #ffffff;
  font-weight: 700;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e0e0e0;
  }
`;

export const ConfirmButton = styled.button`
  font-size: 12px;
  width: 60px;
  height: 40px;
  background-color: #0084ff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 5px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;
