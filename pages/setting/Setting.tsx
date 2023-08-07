import Main from '@/components/Home/Main';
import Header from '@/components/common/Header';
import React from 'react';
import styled from 'styled-components';
import UserProfileCardUpdate from '@/components/Setting/UserProfileCardUpdate';
const SettingLayout = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1360px;
  margin: 2rem auto 8rem;
  padding: 0 5%;
  .setting {
    max-width: 1360px;
    margin: 2rem auto 8rem;
    padding: 0 5%;
  }
  .setting-head {
    margin: 4rem 0 2rem;
  }
  .setting-head-title {
    font-size: 3rem;
    font-weight: 300;
    letter-spacing: -0.025rem;
    text-indent: -1px;
  }
  .setting-head-description {
    margin: 1rem 0 0;
    font-size: 2.5rem;
    font-weight: 300;
    letter-spacing: -0.025rem;
    line-height: 1.4;
  }
  .setting-body {
    margin: 4rem 0 0;
  }
  .setting-body-heading {
    margin: 0 0 1rem;
    font-size: 1.25rem;
  }
  .setting-row {
    display: flex;
    margin-top: -1px;
    padding: 1.5rem 2rem;
    box-sizing: border-box;
    overflow: hidden;
    border: 1px solid #051619;
    cursor: pointer;
    position: relative;
  }
  .setting-row-label {
    width: 10rem;
    font-size: 1rem;
    line-height: 24px;
    color: var(--gray400);
  }
  .setting-row-value {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: calc(100% - 10rem);
    color: var(--gray800);
    line-height: 24px;
  }
  .setting-row-change {
    float: right;
    font-size: 1rem;
    position: absolute;
    right: 2.5rem;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
  }
  .icon-arrow {
    margin-left: 1.5rem;
    -webkit-transform: translateX(-1rem);
    transform: translateX(-1rem);
    transition: all 0.4s;
    position: relative;
    font-style: normal;
  }
  .icon-arrow:before {
    content: '';
    position: absolute;
    border-top: 2px solid #051619;
    border-left: 2px solid #051619;
    top: 50%;
    width: 6px;
    height: 6px;
    right: -2px;
    -webkit-transform: translate(50%, -50%) rotate(135deg);
    transform: translate(50%, -50%) rotate(135deg);
  }
  .icon-arrow:after {
    content: '';
    position: absolute;
    background-color: #051619;
    top: 50%;
    right: -5px;
    width: 12px;
    height: 2px;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
  }
  .setting-row-value-username {
    width: 100%;
  }
  .setting-row-value-address {
    width: 100%;
    margin: -0.25rem 0;
    line-height: 1.5;
  }
  .setting-row-value-phone {
    width: 100%;
  }
  .switch {
    display: block;
    position: relative;
  }
  .setting-foot {
    display: flex;
    align-items: center;
    margin: 2rem 0;
  }
  .setting-foot-logout {
    margin-right: 2rem;
    font-size: 1rem;
    text-decoration: underline;
  }
  .setting-foot-delete {
    text-decoration: underline;
    color: #051619;
  }
  input[type='checkbox'][role='switch'] + label {
    display: block;
    height: 24px;
    padding-left: 64px;
    cursor: pointer;
  }
  input[type='checkbox'][role='switch'] + label:before {
    content: '';
    display: block;
    width: 48px;
    height: 24px;
    border: 1px solid #051619;
    border-radius: 20px;
    box-sizing: border-box;
    background: #ccc;
    position: absolute;
    left: 0;
    top: 0;
    transition: background 0.2s;
  }
  input[type='checkbox'][role='switch'] + label:after {
    content: '';
    display: block;
    width: 16px;
    height: 16px;
    border: none;
    border-radius: 50%;
    background: #fff;
    position: absolute;
    left: 4px;
    top: 4px;
    transition: left 0.2s;
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  .textfield {
    margin: 1rem 0;
    position: relative;
  }
  .textfield-input {
    display: block;
    width: 100%;
    padding: 10px 40px 11px 1.5rem;
    border: 1px solid #051619;
    border-radius: 0;
    box-sizing: border-box;
    box-shadow: 0;
    font: inherit;
    color: #051619;
    transition: all 0.2s;
    outline: none;
    box-shadow: none;
  }
  fieldset,
  hr,
  iframe,
  img {
    border: 0;
  }
  fieldset,
  legend,
  menu,
  ol,
  ul {
    margin: 0;
    padding: 0;
  }
  button:not(:active),
  button:not(:focus) {
    outline: 0;
  }

  .primary-button {
    display: inline-block;
    min-width: 104px;
    background: #ff6b00;
    padding: 10px 1.5rem 11px;
    border-radius: 0;
    text-align: center;
    cursor: pointer;
    position: relative;
    border-radius: 8px;
    background: #051619;
    border: 1px solid #051619;
    color: #fff;
  }
  .setting-row-foot-cancel {
    margin-left: 0.5rem;
  }

  select:not(:-internal-list-box) {
    overflow: visible !important;
  }

  .teriary-button {
    display: inline-block;
    min-width: 104px;
    background: #ff6b00;
    padding: 10px 1.5rem 11px;
    border-radius: 0;
    text-align: center;
    color: #fff;
    cursor: pointer;
    position: relative;
    border-radius: 8px;
    background: none;
    border: none;
    color: #051619;
  }

  fieldset,
  legend,
  menu,
  ol,
  ul,
  hr,
  iframe,
  img {
    margin: 0;
    padding: 0;
    border: 0;
  }
`;

const Setting = () => {
  return (
    <Main>
      <Header />
      <SettingLayout>
        <UserProfileCardUpdate />
      </SettingLayout>
    </Main>
  );
};

export default Setting;
