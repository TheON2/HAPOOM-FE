import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { profilePreset } from '@/public/presetData';
import { ProfileBox } from '@/styles/detail';
const ProfileImageBox = styled.div``;

// const profilePreset = ['/b1.png', '/b2.png', '/b3.png', '/c1.jpeg'];
// const UserImage = '/inflearn.jpg';
// const PRESET = 2;

type profileProps = {
  userImage: string | null | undefined;
  preset: number | null | undefined;
  nick: string | null | undefined;
};

const DetailProfile = ({ userImage, preset, nick }: profileProps) => {
  const [profileImage, setProfileImage] = useState<string | null | undefined>();
  const [nickname, setNickname] = useState<string | null | undefined>('nick');

  useEffect(() => {
    if (preset === 1) {
      setProfileImage(userImage);
    } else {
      const foundPreset = profilePreset.find(
        (presetElement, idx) => idx + 2 === preset
      );
      setProfileImage(foundPreset);
    }
  }, [preset, userImage]);

  useEffect(() => {
    setNickname(nick);
  }, [nick]);

  return (
    <ProfileBox>
      <div className="image">
        {profileImage && (
          <Image src={profileImage} alt={'image'} width={100} height={100} />
        )}
      </div>
      {/* <div> */}
      <h2>{nickname}</h2>
      {/* </div> */}
    </ProfileBox>
  );
};

export default DetailProfile;
