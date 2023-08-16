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
  width: 280px;
  height: 150px;
  background-color: #fff;
  padding-top: 10px;
  padding-bottom: 10px;
  box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .modalTitle {
    font-size: 16px;
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
  gap: 80px;
`;

export const CancelButton = styled.div`
  font-weight: 700;
  display: flex;
  width: 60px;
  height: 30px;
  padding: 10px 15px;
  background-color: #d9d9d9;
  color: #000000;
  border: none;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 13px;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.15);
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 0.85) 0%,
    rgba(108, 108, 108, 0.6) 0.01%,
    rgba(143, 142, 142, 0.76) 38.02%,
    rgba(164, 164, 164, 0.83) 41.67%,
    rgba(181, 181, 181, 0.86) 89.58%,
    #c2c2c2 100%
  );
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.15);

  &:hover {
    background-color: #716c6c;
    cursor: pointer;
  }
`;

export const DeleteButton = styled.div`
  font-weight: 700;
  display: flex;
  width: 60px;
  height: 30px;
  padding: 10px 15px;
  background-color: #0084ff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.15);

  background: rgb(0, 132, 255);
  background: linear-gradient(
    180deg,
    rgba(0, 132, 255, 0.639093137254902) 0%,
    rgba(0, 132, 255, 0.7595413165266106) 55%,
    rgba(0, 132, 255, 0.8295693277310925) 58%,
    rgba(0, 132, 255, 1) 100%
  );

  &:active {
    background-color: #0056b3;
    cursor: pointer;
  }
`;
