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
  z-index: 20;
`;

export const ModalContainer = styled.div`
  /* width: 280px; */
  /* height: 150px; */
  max-width: 420px;
  width: 60%;
  background-color: #fff;
  padding: 10px 24px 16px;
  box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 32px;

  .modalTitle {
    font-size: 16px;
    line-height: 1.4;
    text-align: center;
  }

  span {
    font-weight: 700;
  }
`;

export const WarningContainer = styled.div`
  margin-top: 10px;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 40px;
    height: 40px;
    background-color: #46a6ff;
    border-radius: 50%;
    justify-content: center;
    margin: auto;
  }
`;

export const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  button {
    max-width: 160px;
  }
`;
