import styled from 'styled-components';
import Link from 'next/link';

export const MobileBottomNavLayout = styled.nav`
  position: fixed;
  padding: 8px 24px;
  bottom: 0;
  width: 100%;
  display: flex;
  /* justify-content: center; */
  background: #fff;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  z-index: 115;
  color: #0084ff;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export const BottomNavList = styled.ul`
  /* max-width: 500px; */
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const BottomNavItem = styled.li`
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    line-height: 7px;
  }
`;

export const IconBox = styled.button`
  width: 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: 10px;
  border: none;
  background: none;
  color: #777;
  font-weight: 700;
  path {
    stroke: #777;
  }
  .image-box {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 2px solid #777;
    overflow: hidden;
    svg {
      width: 90%;
      height: 90%;
      object-fit: contain;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &:hover {
    filter: brightness(0.7);
    color: #0084ff;
    path {
      stroke: #0084ff;
    }
    .image-box {
      border: 2px solid #0084ff;
    }
  }
  &.active {
    color: #0084ff;
    path {
      stroke: #0084ff;
    }
    .image-box {
      border: 2px solid #0084ff;
    }
  }
`;

//side menu style
export const SideNavLayout = styled.nav`
  position: fixed;
  right: 0;
  width: 30%;
  height: 100vh;
  /* padding: 0 24px 50px; */
  background-color: #fff;
  z-index: 120;
  display: flex;
  top: 0;

  flex-direction: column;
  /* justify-content: space-between; */
  @media screen and (max-width: 768px) {
    width: 70%;
    /* animation-duration: 0.3s; */
    animation: slidein 1s ease-in-out;
  }
  button {
    cursor: pointer;
  }
  @keyframes slidein {
    from {
      transform: translateX(100%);
    }

    to {
      transform: translateX(0);
    }
  }
`;

export const SideNavMenuBox = styled.div`
  width: 100%;
  height: 50%;
  padding: 0 24px;
  /* border: 1px solid #000; */
`;

// export const SideNavMenuItem = styled.li`
//   width: 100%;
//   /* border: 1px solid #000; */
//   &.none-padding {
//     padding: 0;
//   }
//   button {
//     width: 100%;
//     height: 100%;
//     padding: 20px 30px;
//     text-align: start;
//   }
//   a {
//     display: block;
//     width: 100%;
//     padding: 20px 30px;
//   }
// `;

export const SubMenuList = styled.ul`
  width: 100%;
  li {
    width: 100%;
    border: 1px solid #000;
  }
`;
