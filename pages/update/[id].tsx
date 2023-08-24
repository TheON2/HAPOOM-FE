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

const Update = () => {
  const router = useRouter();
  const { id } = router.query;

  // id가 정의되지 않았거나 배열이라면 에러 처리
  if (!id || Array.isArray(id)) {
    // 여기서 에러 처리 로직을 작성하거나
    // 다른 페이지로 리다이렉트할 수 있습니다.
    return null;
  }

  return (
    <>
      <Write update={'2'} updateId={id} />
    </>
  );
};

export default Update;
