import NextAuth from 'next-auth';
import ProviderGoogle from 'next-auth/providers/google';
import ProviderKaKao from 'next-auth/providers/kakao';
import ProviderNaver from 'next-auth/providers/naver';

export default NextAuth({
  providers: [
    ProviderGoogle({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
    }),
    ProviderKaKao({
      clientId: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET as string,
    }),
    ProviderNaver({
      clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
});
