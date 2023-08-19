import React, { FormEvent, useEffect, useState } from 'react';
import {
  GlobalStyle,
  ImageContainer,
  PreviewContainer,
  StyledButton,
} from '../../styles/write';
import Dropzone from '@/components/Write/Dropzone';
import ImagePreview from '@/components/Write/ImagePreview';
import { YouTubeSearch } from '@/components/Write/YoutubeSearchInput';
import { MapComponent } from '@/components/Write/MapComponent';
import ContentArea from '@/components/Write/ContentArea';
import TagInput from '@/components/Write/TagInput';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { addPost, getPost, updatePost } from '@/api/post';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, wrapper } from '@/redux/config/configStore';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { getAuthToken } from '@/api/user';
import { AUTH_USER, UserResponse } from '@/redux/reducers/userSlice';
import MobileBottomNav from '@/components/common/MobileBottomNav';
import { parseCookies, setCookie } from 'nookies';
import { GetServerSidePropsContext, NextPage } from 'next';
import RecordPlayer from '@/components/Write/RecordPlayer';
import CustomPlayer from '@/components/Write/CustomPlayer';
import MusicSelector from '@/components/Write/MusicSelector';
import { Form } from 'react-bootstrap';
import Accordion from '@/components/Write/Accordion';
import youtube from '@/public/youtube.png';
import music from '@/public/music.png';
import record from '@/public/record.png';
import UpAndDownTab from '@/components/common/UpAndDownTab';
import CustomButton from '@/components/Write/CustomButton';
import axios from 'axios';
import Write from '../post/Write';

const DynamicComponentWithNoSSR = dynamic(
  () => import('@/components/Write/YoutubePlayer'),
  { ssr: false }
);

interface Image {
  url: string;
}
interface Props {
  update: string;
  updateId: string;
}

interface Props {
  id: string;
  data: any;
}

const Update: React.FC<Props> = ({ updateId, data }) => {
  return (
    <>
      <h1>{updateId}</h1>
      <Write update={'2'} updateId={updateId} data={data} />
    </>
  );
};

export default Update;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const updateId = context.query.id as string;

  try {
    const data = await getPost(updateId);

    if (!data) {
      return {
        redirect: {
          destination: '/', // 메인 페이지로 리다이렉션
          permanent: false,
        },
      };
    }

    return {
      props: {
        updateId,
        data,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      redirect: {
        destination: '/', // 메인 페이지로 리다이렉션
        permanent: false,
      },
    };
  }
};
