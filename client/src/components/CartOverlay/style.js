import { Link } from "react-router-dom";
import styled from "styled-components";

export const CartButton = styled("button")`
  background: none;
  border: none;

  cursor: pointer;
`;

export const CardButtonContainer = styled("div")`
  position: relative;
  width: 20px;
  height: 20px;
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
    display: ${({ show }) => (show ? 'block' : 'none')};
    position: fixed;
    top: 79px;
    left: 0;
    height: 100vh;
    width:100vw;
    background: rgba(0,0,0,0.22);
`;

export const CartContent = styled("div")`
  display: ${({ show }) => (show ? 'block' : 'none')};

  position: absolute;
  top: 49px;
  right: 0px;

  width: 425px;

  padding: 32px 16px;

  background-color: #ffffff;
`;

export const CardListContainer = styled("div")`
  display: flex;
  flex-direction: column;

  row-gap: 40px;

  min-height: 100px;
  max-height: 300px;

  overflow: scroll;
`;

export const TotalPriceContainer = styled("div")`
  display: flex;
  justify-content: space-between;
`;

export const TotalPriceTitle = styled("span")`
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
`;

export const TotalPriceValue = styled("span")`
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
`;

export const CartButtonsContainer = styled("div")`
  padding-top: 32px;

  display: flex;
  justify-content: space-between;
`;

export const ViewBagButton = styled(Link)`
  display: block;

  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-size: 14px;
  text-decoration: none;
  color: #1D1F22;
  line-height: 42px;
  text-align: center;

  width: 140px;
  height: 43px;

  border: 1px solid #1D1F22;
`;

export const CheckOutButton = styled("button")`
  display: block;

  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-size: 14px;
  text-decoration: none;
  color: #ffffff;
  line-height: 42px;
  text-align: center;

  width: 140px;
  height: 43px;

  border: none;
  background-color: #5ECE7B;

  cursor: pointer;
`;

export const EmptyCartOverlayContainer = styled("div")`
  font-family: 'Raleway', sans-serif;
  font-weight: 500;
  font-size: 14px;

  width: 100%;
  height: 150px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

