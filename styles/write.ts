import styled, { createGlobalStyle } from 'styled-components';

export const GlobalFonts = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap');
`;

// export const GlobalStyle = createGlobalStyle`
//   body{
//     color: #051619;
//     font-size: 14px;
//     font-family: "Noto Sans KR","Apple SD Gothic Neo",sans-serif;
//     line-height: 1.8;
//     -webkit-text-size-adjust: 100%;
//     -webkit-font-smoothing: antialiased;
//     text-rendering: optimizeLegibility;
//     letter-spacing: -.0125rem;
//     margin: 0;
//   }
//   `;

export const Box = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: start;
  margin-bottom: 36px;
  position: relative;
  h2 {
    font-size: 20px;
    margin-bottom: 8px;
    text-align: center;
    padding: 12px 36px;
    background-color: #eff7ff;
    border-radius: 30px;
    border: 2px solid #dfefff;
    color: #1f6cb9;
  }
  label {
    margin-bottom: 16px;
    font-weight: 700;
    color: #334765;
  }
`;
type limitProps = {
  $color: boolean;
};
export const InputContainer = styled.div`
  width: 100%;
  position: relative;
  label {
    font-weight: 700;
    color: #334765;
  }
  input {
    margin-top: 16px;
  }
`;
export const LimitNumBox = styled.span<limitProps>`
  position: absolute;
  bottom: 5px;
  right: 10px;
  color: ${(props) => (props.$color ? '#FF5D5D' : '#334765')};
`;
export const InputBox = styled.input`
  display: block;
  width: 100%;
  padding: 16px 1.3rem;
  color: #051619;
  outline: none;
  padding: 12px 24px 10px;
  border: 2px solid #e8e8e8;
  border-radius: 12px;
  background-color: #f0efef;
  font-size: 0.915rem;
`;
export const TagBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 20px;
`;
export const RecordButtonBox = styled.div`
  width: 100%;
  display: flex;
  margin-top: 16px;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
`;
export const RecordEditBox = styled.div`
  max-width: 360px;
  width: 100%;
  margin: 8px auto;
  padding: 8px 0;
`;
export const PreviewContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  /* max-width: 400px; */
`;

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StyledAuthInput = styled.input`
  display: block;
  width: 400px;
  padding: 10px 1.3rem;
  margin: 5px;
  border: 1px solid #051619;
  border-radius: 0;
  box-sizing: border-box;
  box-shadow: none;
  font: inherit;
  color: #051619;
  transition: all 0.2s;
  outline: none;
  box-shadow: none;
  font-size: 0.915rem;
`;

export const StyledSection = styled.section`
  display: flex;
  min-height: 100vh;
  width: 100vw;
  background: #eae7de;
  height: 100%;
  overflow-x: hidden;
  color: #051619;
  font-size: 14px;
  font-family: 'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif;
  line-height: 1.8;
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
`;

export const StyledForm = styled.form`
  max-width: 400px;
  margin: 0 auto;
  padding: 7.5% 5% 4rem;
  position: relative;
`;

export const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledA = styled.a`
  display: block;
  width: 60%;
`;

export const StyledButton = styled.button`
  min-width: 104px;
  width: 100%;
  padding: 11px 1.3rem;
  cursor: pointer;
  position: relative;
  border-radius: 3px;
  border: none;
  box-sizing: border-box;
  background: #0084ff;
  color: white;
  /* margin: 2rem 0; */
  text-align: center;
`;

export const StyledDevider = styled.div`
  height: 2px;
  margin: 1.725rem auto;
  background: #051619;
  text-align: center;
  position: relative;
  z-index: 1;
`;

export const StyledTextField = styled.div`
  margin: 0.8rem 0;
  position: relative;
`;

export const StyledSpan = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-right: 0.8rem;
`;
