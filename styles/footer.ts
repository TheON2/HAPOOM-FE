import styled from 'styled-components';

export const FooterLayout = styled.footer`
  width: 100%;
  /* height: 30vh; */
  background-color: gray;
`;

export const FooterBox = styled.div`
  max-width: 768px;
  width: 100%;
  padding: 30px 20px 100px;
  margin: 0 auto;
  display: flex;
  gap: 24px;
`;

export const LogoBox = styled.div`
  width: 30%;
  height: 50px;
  background-color: #000;
  position: relative;
  img {
    object-fit: contain;
  }
`;
export const FooterContent = styled.div`
  width: 70%;
  color: #fff;
  font-size: 0.8rem;
  line-height: 1.4rem;
`;
