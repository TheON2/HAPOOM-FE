import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { ProfileBox } from '@/styles/setting';
import { profilePreset } from '@/public/presetData';
const ProfileImageBox = styled.div``;

// const profilePreset = ['/b1.png', '/b2.png', '/b3.png', '/c1.jpeg'];
// const UserImage = '/inflearn.jpg';
// const PRESET = 2;

type profileProps = {
  userImage: string;
  preset: number;
  nickname: string;
};

const Profile = ({ userImage, preset, nickname }: profileProps) => {
  const [profileImage, setProfileImage] = useState<string | undefined>();

  useEffect(() => {
    if (preset === 1) {
      setProfileImage(userImage);
    } else {
      const foundPreset = profilePreset.find(
        (presetElement, idx) => idx + 2 === preset
      );
      setProfileImage(foundPreset);
    }
  }, [preset]);

  return (
    <ProfileBox>
      <div className="image">
        {profileImage && (
          <Image src={profileImage} alt={'image'} width={100} height={100} />
        )}
      </div>
      <div>
        <h2>{nickname}</h2>
        <p>aaa@gmail.com</p>
      </div>
    </ProfileBox>
  );
};

export default Profile;
