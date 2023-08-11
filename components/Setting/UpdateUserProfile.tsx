import React, { ChangeEvent, FormEvent, useState } from 'react';
import Image from 'next/image';
import { useMutation, useQueryClient } from 'react-query';
import Button from '@/components/common/Button';
import { updateUserSetting } from '@/api/user';
import { ProfilePresetList, ProfileItem, ButtonBox } from '@/styles/setting';
import { profilePreset } from '@/public/presetData';
const profileData = ['/inflearn.jpg', '/inflearn.jpg', '/inflearn.jpg'];

type profileType = {
  profileImage?: string;
  preset?: number;
};

const UserProfileImageUpdate = ({ profileImage, preset }: profileType) => {
  const [selectPreset, setSelectPreset] = useState<number>(preset ? preset : 5);
  const [userProfile, setUserProfile] = useState<any>(profileImage);

  const onClickProfileHandler = (idx: number) => {
    setSelectPreset(idx + 1);
  };
  const queryClient = useQueryClient();

  const mutate = useMutation(
    (formData: FormData) => updateUserSetting(formData),
    {
      onSuccess: () => {
        alert('수정되었습니다.');
        queryClient.invalidateQueries('userSetting');
      },
    }
  );

  const onChangeProfileUpdate = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files;
    const imageData = new FormData();

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onloadend = () => {
        setUserProfile(reader.result as string);
      };
      imageData.append('image', file[0]);
      imageData.append('preset', '1');
      await mutate.mutateAsync(imageData);
      console.log('업로드');
    }
  };

  const presetMutate = useMutation(
    (formData: FormData) => updateUserSetting(formData),
    {
      onSuccess: () => {
        alert('수정되었습니다.');
        queryClient.invalidateQueries('userSetting');
      },
    }
  );

  const onSubmitUserProfile = async (e: FormEvent) => {
    e.preventDefault();
    const presetData = new FormData();

    presetData.append('preset', selectPreset.toString());
    await presetMutate.mutateAsync(presetData);
  };

  return (
    <>
      <form action="" onSubmit={onSubmitUserProfile}>
        <ProfilePresetList>
          <ProfileItem onClick={() => onClickProfileHandler(0)}>
            <figure className={selectPreset === 1 ? 'active' : ''}>
              <Image
                src={userProfile ? userProfile : '/inflearn.jpg'}
                alt="preset"
                width={100}
                height={100}
                quality={100}
              />
            </figure>
          </ProfileItem>
          {profilePreset.map((profile, idx) => {
            return (
              <ProfileItem
                key={idx}
                onClick={() => onClickProfileHandler(idx + 1)}
              >
                <figure className={selectPreset === idx + 2 ? 'active' : ''}>
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
          {/* <ProfileItem onClick={() => onClickProfileHandler(4)}>
            <figure className={selectPreset === 5 ? 'active' : ''}>
              <Image src={'/addImage.png'} alt="preset" fill />
            </figure>
          </ProfileItem> */}
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
