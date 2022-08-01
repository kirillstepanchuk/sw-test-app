import styled from "styled-components";

export const CardButtonContainer = styled("div")`
  position: relative;
  width: 20px;
  height: 20px;

  z-index: 1;
`;

export const ImageContainer = styled("img")`
  width: 20px;
  height: 20px;
`;

export const CartTopInfo = styled("span")`
  display: block;

  font-family: 'Raleway', sans-serif;
  font-weight: 500;
  font-size: 16px;

  margin-bottom: 32px;
`;

export const CartTopInfoTitle = styled("span")`
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
`;

export const CartCounter = styled("div")`
  position: absolute;
  right: -10px;
  top: -10px;

  color: #ffffff;

  width: 20px;
  height: 20px;

  background-color: #000000;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalBackground = styled("div")`
    /* z-index: 100; */
    display: ${({ show }) => (show ? 'block' : 'none')};
    position: fixed;
    top: 79px;
    left: 0;
    height: 100vh;
    width:100vw;
    background: rgba(0,0,0,0.22);
`;

export const CartContent = styled("div")`
    /* z-index: 1; */
  display: ${({ show }) => (show ? 'block' : 'none')};

  position: absolute;
  top: 49px;
  right: 0px;

  width: 325px;
  height: 400px;

  padding: 32px 16px;

  background-color: #ffffff;
`;

