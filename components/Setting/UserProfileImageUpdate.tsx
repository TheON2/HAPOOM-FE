import React, { ChangeEvent, FormEvent, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { QueryClient, useMutation } from 'react-query';
const PADDING_HEIGHT = 7.7;

const ProfileImageUpdateLayout = styled.div`
  width: 100%;
  h2 {
    margin-bottom: 18px;
  }
`;

const ProfilePresetList = styled.ul`
  display: flex;
  width: 100%;
`;

const ProfileItem = styled.li`
  width: 16.7%;
  text-align: center;
  figure {
    display: block;
    width: 100%;
    padding-bottom: ${PADDING_HEIGHT}rem;
    position: relative;
    border: 2px solid #fff;
    &.active {
      border: 2px solid hotpink;
      img {
        filter: brightness(1);
      }
    }
  }
  input {
    width: 0;
    display: none;
  }
  img {
    object-fit: cover;
    filter: brightness(0.8);
    &:hover {
      filter: brightness(1);
    }
  }
`;

// const ImageBox = styled.div`
//   width: 16.6%;
//   padding-bottom: ${PADDING_HEIGHT}rem;
//   background-color: gray;
//   border: 1px solid #000;
//   position: relative;
//   img {
//     object-fit: cover;
//   }
// `;

const profileData = [
  '/inflearn.jpg',
  '/inflearn.jpg',
  '/inflearn.jpg',
  '/inflearn.jpg',
];

const UserProfileImageUpdate = () => {
  const [selectProfile, setSelectProfile] = useState<number>(0);
  const [userProfile, setUserProfile] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [selectedImageSrc, setSelectedImageSrc] = useState<
    File | string | null
  >('');

  const onClickProfileHandler = (idx: number, src: string | File | null) => {
    setSelectProfile(idx);
    setSelectedImageSrc(src);
  };
  console.log(selectedImageSrc);

  const onChangeProfileUpdate = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;
    if (file) {
      setImage(file[0]);
      const reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onloadend = () => {
        setUserProfile(reader.result as string);
      };
    }
  };

  //   const mutation = useMutation((formData) => 기능(formData), {
  //     onSuccess: (msg) => {
  //         QueryClient.invalidateQueries('tradingItem');
  //     },
  // });

  const onSubmitUserProfile = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (image) {
      formData.append('profileImage', image);
      // await mutation.mutateAsync(formData);
      console.log(formData);
    }
    console.log('submit');
  };

  return (
    <ProfileImageUpdateLayout>
      <form action="" onSubmit={onSubmitUserProfile}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <h2>프로필 이미지 수정</h2>
          <button type="submit">수정하기</button>
        </div>
        <ProfilePresetList>
          <ProfileItem onClick={() => onClickProfileHandler(0, image && image)}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              프로필 이미지
              <label htmlFor="profile">
                <Image
                  src={'/🦆 icon _cloud_.svg'}
                  alt="preset"
                  width={20}
                  height={20}
                />
              </label>
            </div>
            <input id="profile" type="file" onChange={onChangeProfileUpdate} />
            <figure className={selectProfile === 0 ? 'active' : ''}>
              <Image
                src={userProfile ? userProfile : '/inflearn.jpg'}
                alt="preset"
                fill
              />
            </figure>
          </ProfileItem>
          {profileData.map((profile, idx) => {
            return (
              <ProfileItem
                key={idx}
                onClick={() => onClickProfileHandler(idx + 1, profile)}
              >
                <p>프로필 캐릭터 {idx + 1}</p>
                <figure className={selectProfile === idx + 1 ? 'active' : ''}>
                  <Image src={profile} alt="preset" fill />
                </figure>
              </ProfileItem>
            );
          })}
          <ProfileItem onClick={() => onClickProfileHandler(5, null)}>
            <p>프로필 이미지 없음</p>
            <figure className={selectProfile === 5 ? 'active' : ''}>
              <Image src={'/addImage.png'} alt="preset" fill />
            </figure>
          </ProfileItem>
        </ProfilePresetList>
      </form>
    </ProfileImageUpdateLayout>
  );
};

export default UserProfileImageUpdate;
