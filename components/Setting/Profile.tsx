import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ProfileBox } from '@/styles/setting';
import { profilePreset } from '@/public/presetData';

type profileProps = {
  userImage: string;
  preset: number;
  nickname: string;
  email: string;
  direction?: 'column' | 'row';
};

const Profile = ({
  userImage,
  preset,
  nickname,
  email,
  direction,
}: profileProps) => {
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
    <ProfileBox direction={direction}>
      <div className="image">
        {profileImage && (
          <Image
            src={profileImage}
            alt={'image'}
            width={74}
            height={74}
            objectFit="cover"
          />
        )}
      </div>
      <div>
        <h2>{nickname}</h2>
        <span></span>
        <p>{email}</p>
      </div>
    </ProfileBox>
  );
};

export default Profile;
