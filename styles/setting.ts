import styled from 'styled-components';

/* setting page style */

export const SettingLayout = styled.section`
  display: flex;
  flex-direction: column;
  height: auto;
  align-items: center;
  max-width: 1360px;
  padding: 0 24px;
`;

export const AccordianContent = styled.div`
  width: 100%;
  padding-bottom: 36px;
`;

export const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 30px;
  gap: 30px;
  /* height: 10vh; */
  .image {
    width: 100px;
    height: 100px;
    border-radius: 50px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

/* setting profile update conponent style */

export const ProfilePresetList = styled.ul`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  margin: 0 0 20px;
`;

export const ProfileItem = styled.li`
  width: 20%;
  text-align: center;
  figure {
    display: block;
    width: 100%;
    padding-bottom: 95%;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    border: 2px solid #fff;
    &.active {
      border: 2px solid #0084ff;
      img {
        filter: brightness(1);
      }
    }
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.8);
    &:hover {
      filter: brightness(1);
    }
  }
`;

export const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 8px;
  .profile-button {
    width: 50%;
  }
  label {
    padding: 12px 16px 8px;
    border-radius: 3px;
    color: #fff;
    border: 1px solid #0084ff;
    background-color: #0084ff;
    text-align: center;
    cursor: pointer;
  }
  input {
    width: 0;
    display: none;
  }
`;

/* setting input conponent style */

export const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  span {
    font-size: 10px;
    font-weight: 700;
    color: #868686;
    padding: 8px 0 6px;
  }
`;

export const InputStyle = styled.input`
  width: 100%;
  font-size: 12px;
  padding: 12px 28px 10px;
  border-radius: 3px;
  border: 1px solid #0084ff;
  color: #999999;
`;

/* setting ThemesBox conponent style */

export const ThemesBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  button {
    padding: 10px 0 8px;
    border-radius: 24px;
    font-size: 12px;
    border: none;
    &:nth-child(1) {
      background-color: #fff;
      border: 1px solid #5f7ba6;
    }
    &:nth-child(2) {
      background-color: #132b4f;
      color: #fff;
    }
    &:nth-child(3) {
      background-color: #000;
      color: #fff;
    }
  }
`;