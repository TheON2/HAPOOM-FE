import React, {
  ChangeEvent,
  FormEvent,
  ReactNode,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { QueryClient, useMutation } from 'react-query';
import Button from '@/components/common/Button';
// import
const ProfilePresetList = styled.ul`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  margin: 0 0 20px;
`;

const ProfileItem = styled.li`
  width: 20%;
  text-align: center;
  figure {
    display: block;
    width: 100%;
    padding-bottom: 95%;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    border: 2px solid #fff;
    &.active {
      border: 2px solid #0084ff;
      img {
        filter: brightness(1);
      }
    }
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.8);
    &:hover {
      filter: brightness(1);
    }
  }
`;

const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 8px;
  .profile-button {
    width: 50%;
  }
  label {
    padding: 12px 16px 8px;
    border-radius: 3px;
    color: #fff;
    border: 1px solid #0084ff;
    background-color: #0084ff;
    text-align: center;
    cursor: pointer;
  }
  input {
    width: 0;
    display: none;
  }
`;

const profileData = ['/inflearn.jpg', '/inflearn.jpg', '/inflearn.jpg'];

const UserProfileImageUpdate = () => {
  const [selectProfile, setSelectProfile] = useState<number>(0);
  const [userProfile, setUserProfile] = useState<string>('');
  const [image, setImage] = useState<File | Blob | null>(null);
  const imageRef = useRef<File | null>(null);

  const onClickProfileHandler = (idx: number, src?: string | File | null) => {
    setSelectProfile(idx);

    if (idx === 0) {
      setImage(imageRef.current);
    } else if (idx === 4) {
      setImage(null);
    } else {
      handleImageUpload(src);
    }
  };

  const onChangeProfileUpdate = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;
    console.log(file);
    if (file) {
      imageRef.current = file[0];
      setImage(file[0]);
      const reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onloadend = () => {
        setUserProfile(reader.result as string);
      };
    }
  };

  // const mutation = useMutation((formData) => 기능(formData), {
  //   onSuccess: (msg) => {
  //     QueryClient.invalidateQueries('tradingItem');
  //   },
  // });

  const handleImageUpload = async (imagePath: any) => {
    const response = await fetch(imagePath);
    const imageData = await response.blob();
    setImage(imageData);
  };

  const onSubmitUserProfile = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (image) {
      formData.append('profileImage', image);
      // console.log('submit');
      // console.log(image);
      // console.log(formData);
    } else {
      formData.append('profileImage', '');
    }
  };

  return (
    <>
      <form action="" onSubmit={onSubmitUserProfile}>
        <ProfilePresetList>
          <ProfileItem onClick={() => onClickProfileHandler(0)}>
            <figure className={selectProfile === 0 ? 'active' : ''}>
              <Image
                src={userProfile ? userProfile : '/inflearn.jpg'}
                alt="preset"
                width={100}
                height={100}
                quality={100}
              />
            </figure>
          </ProfileItem>
          {profileData.map((profile, idx) => {
            return (
              <ProfileItem
                key={idx}
                onClick={() => onClickProfileHandler(idx + 1, profile)}
              >
                <figure className={selectProfile === idx + 1 ? 'active' : ''}>
                  <Image
                    src={profile}
                    alt="preset"
                    width={100}
                    height={100}
                    quality={100}
                  />
                </figure>
              </ProfileItem>
            );
          })}
          <ProfileItem onClick={() => onClickProfileHandler(4)}>
            <figure className={selectProfile === 4 ? 'active' : ''}>
              <Image src={'/addImage.png'} alt="preset" fill />
            </figure>
          </ProfileItem>
        </ProfilePresetList>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <ButtonBox>
            <label htmlFor="profile" className="profile-button">
              프로필 업로드
            </label>
            <input id="profile" type="file" onChange={onChangeProfileUpdate} />
            <Button type="submit" className="profile-button">
              프로필 변경
            </Button>
          </ButtonBox>
        </div>
      </form>
    </>
  );
};

export default UserProfileImageUpdate;
