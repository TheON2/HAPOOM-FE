import Image from 'next/image';
import React from 'react';
import {
  FooterLayout,
  FooterBox,
  LogoBox,
  FooterContent,
} from '@/styles/footer';

const Footer = () => {
  return (
    <FooterLayout>
      <FooterBox>
        <LogoBox>
          <p>HAPOOM</p>
        </LogoBox>
        <FooterContent>
          (주)하품ㅣ사업자등록번호220-81-62517ㅣ
          통신판매업신고번호:제2006-경기성남-0692호 주소:경기도 성남시 분당구
          정자일로 95, NAVER 1784, 13561
          대표전화:1588-3820ㅣ이메일:ccnaver@naver.com 호스팅 서비스 제공 NAVER
          Cloud
        </FooterContent>
        <FooterContent>
          개인정보처리방침ㅣ이용약관ㅣsobest@sparta.co.kr
        </FooterContent>
      </FooterBox>
    </FooterLayout>
  );
};

export default Footer;
