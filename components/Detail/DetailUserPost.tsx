import React, { useEffect, useState, memo } from 'react';
import {
  Dropdown,
  UserCommentBox,
  UserContainer,
  UserHeaderBox,
  UserPictureBox,
} from '@/styles/detail';
import Image from 'next/image';

const DetailUserPost: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [images, setImages] = useState([]);

  const imagesPerPage = 1;
  const totalPages = Math.ceil(images.length / imagesPerPage);

  const handleDropdownClick = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const prevImage = () => {
    setCurrentPage((oldPage) => Math.max(oldPage - 1, 1));
  };

  const nextImage = () => {
    setCurrentPage((oldPage) => Math.min(oldPage + 1, totalPages));
  };

  const gotoImage = (index) => {
    setCurrentPage(index + 1);
  };

  // const fetchImages = async () => {
  //   사용자가 등록한 이미지를 가져오는 API를 호출합니다.
  //   예를 들어, 다음과 같이 사용자의 ID를 사용해 이미지를 가져올 수 있습니다.
  //   const response = await fetch(`/api/user/${userId}/images`);
  //   const userImages = await response.json();

  //   가져온 이미지를 상태로 저장합니다.
  //   setImages(userImages);
  // };

  // useEffect(() => {
  //   fetchImages();
  // }, []);

  const DropdownComponent = memo(() => (
    <Dropdown className="dropdown">
      <ul>
        <li>게시글 삭제</li>
        <li>게시글 수정</li>
      </ul>
    </Dropdown>
  ));
  DropdownComponent.displayName = 'DropdownComponent';

  const UserHeaderComponent = memo(() => (
    <UserHeaderBox>
      <UserContainer>
        <p className="userPic">사진</p>
        <p className="userNickname">닉네임</p>
      </UserContainer>
      <button onClick={handleDropdownClick}>햄버거 모양 아이콘</button>
      {isDropdownOpen && <DropdownComponent />}
    </UserHeaderBox>
  ));
  UserHeaderComponent.displayName = 'UserHeaderComponent';

  const UserPictureBoxComponent = () => {
    const currentImage = images[currentPage - 1];

    useEffect(() => {
      // 버튼을 클릭할 때만 gotoImage 함수를 호출합니다.
      if (currentPage !== 1) {
        gotoImage(currentPage - 1);
      }
    }, [currentPage]);

    return (
      <UserPictureBox>
        <div>
          {images.map((img, index) => (
            <Image
              key={img}
              src={img}
              alt="User uploaded"
              width={500}
              height={500}
              loading="eager"
              style={{ display: index + 1 === currentPage ? 'block' : 'none' }}
            />
          ))}
        </div>
        <div className="dot-navigation">
          {images.map((img, index) => (
            <span
              key={img}
              className={`dot ${index + 1 === currentPage ? 'active' : ''}`}
              onClick={() => gotoImage(index)}
            ></span>
          ))}
        </div>
      </UserPictureBox>
    );
  };

  const UserCommentBoxComponent = () => {
    const [comments, setComments] = useState([
      // 임시적인 더미 데이터입니다.
      'This is a user comment',
      'This is another user comment',
      'This is yet another user comment',
    ]);

    // Fetch comments from an API
    /*
    useEffect(() => {
      const fetchComments = async () => {
        const response = await fetch(`/api/user/${userId}/comments`);
        const userComments = await response.json();
        setComments(userComments);
      };
  
      fetchComments();
    }, []);
    */

    const [borderColor, setBorderColor] = useState('black'); // 기본 테두리 색상을 설정합니다.
    useEffect(() => {
      // 댓글 중 하나라도 149자를 초과하면 테두리 색상을 변경합니다.
      if (comments.some((comment) => comment.length > 149)) {
        setBorderColor('red');
        alert('A comment exceeds the maximum length of 149 characters!');
      } else {
        setBorderColor('black');
      }
    }, [comments]);

    return (
      <UserCommentBox style={{ borderColor: borderColor }}>
        {comments.map((comment, index) => (
          <p key={index}>{comment}</p>
        ))}
      </UserCommentBox>
    );
  };

  return (
    <>
      <UserHeaderComponent />
      <UserPictureBoxComponent />
      <UserCommentBoxComponent />
    </>
  );
};

export default DetailUserPost;
