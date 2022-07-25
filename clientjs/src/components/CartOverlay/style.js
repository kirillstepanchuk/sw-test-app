import styled from "styled-components";

export const CardButtonContainer = styled("div")`
  position: relative;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export const ImageContainer = styled("img")`
  width: 20px;
  height: 20px;
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
    top: 0;
    left: 0;
    height: 100vh;
    width:100vw;
    background: rgba(0,0,0,0.5);
`;

export const CartContent = styled("div")`
    /* z-index: 1; */

  position: absolute;
  top: 40px;
  right: 0px;

  width: 325px;
  height: 400px;

  background-color: #ffffff;
`;

