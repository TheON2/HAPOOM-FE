import SignUpUi from '@/components/SignUp/SingUpUi';
import { GlobalStyle } from '@/styles/write';
import React from 'react';

const SignUp = () => {
  return (
    <>
      <GlobalStyle />
      <SignUpUi />
    </>
  );
};

export default React.memo(SignUp);
