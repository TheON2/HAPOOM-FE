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
  width: 258x;
  height: 121px;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ModalButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CancelButton = styled.div`
  display: flex;
  width: 84px;
  height: 30px;
  padding: 10px 15px;
  background-color: #d9d9d9;
  color: #000000;
  border: none;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: #716c6c;
    cursor: pointer;
  }
`;

export const DeleteButton = styled.div`
  display: flex;
  width: 84px;
  height: 30px;
  padding: 10px 15px;
  background-color: #0084ff;
  color: #fff;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  &:active {
    background-color: #0056b3;
    cursor: pointer;
  }
`;
