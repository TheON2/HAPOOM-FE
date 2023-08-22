import React, { ChangeEvent, useCallback, useState } from 'react';
import {
  SignUpSection,
  MainHeadText,
  SubHeadText,
  SignUpBtn,
  StyledInputBox,
  StyledInput,
  Checkbox,
  SignUpCheckBox,
  SignUpCheckBoxLayout,
  StyledLabel,
  StyledLabelAll,
  Line,
  TextErrorParagraph,
  StyledLabelEssential,
  TextParagraphSns,
  SnsLine,
  TextParagraphInfo,
  TextParagrapValidate,
} from '@/styles/signUp';
import { useMutation } from 'react-query';
import { addUser } from '@/api/user';
import { NextRouter, useRouter } from 'next/router';
import MobileBottomNav from '../common/MobileBottomNav';
import SocialLogin from '../SignIn/SocialLogIn';
import { SecretEye } from '../common/SVG';
