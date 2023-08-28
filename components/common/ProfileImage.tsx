import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { profilePreset } from '@/public/presetData';

type profileProps = {
  userImage: string | null | undefined;
  preset: number | null | undefined;
  loading?: 'eager' | 'lazy' | undefined;
  onClick?: (event: React.MouseEvent) => void;
};

const ProfileImage = ({ userImage, preset, ...restProps }: profileProps) => {
  const [profileImage, setProfileImage] = useState<string | null | undefined>();

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

  return (
    <>
      {profileImage && (
        <ProfileImageStyle
          src={profileImage}
          alt={'profile image'}
          width={100}
          height={100}
          {...restProps}
        />
      )}
    </>
  );
};

export default ProfileImage;

const ProfileImageStyle = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
