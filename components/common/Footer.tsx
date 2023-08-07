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
          <Image
            src={'/inflearn.jpg'}
            alt="logo-img"
            fill
            sizes="(max-width: 1440px) 200px"
            placeholder="blur"
            blurDataURL={'/inflearn.jpg'}
          />
        </LogoBox>
        <FooterContent>
          하품 정소채
          사업자등록번호220-81-62517통신판매업신고번호제2006-경기성남-0692호주소경기도
          성남시 분당구 정자일로 95, NAVER 1784, 13561
          대표전화1588-3820이메일ccnaver@naver.com호스팅 서비스 제공 NAVER Cloud
        </FooterContent>
      </FooterBox>
    </FooterLayout>
  );
};

export default Footer;
