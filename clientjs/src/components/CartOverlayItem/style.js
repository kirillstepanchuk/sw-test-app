import styled from "styled-components";

export const CartItemContainer = styled("div")`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CardItemLeftContainer = styled("div")`
  width: 200px;
`;

export const CartItemBrand = styled("span")`
  font-family: 'Raleway', sans-serif;
  font-weight: 300;
  font-size: 16px;
`;

export const CartItemName = styled("span")`
  font-family: 'Raleway', sans-serif;
  font-weight: 300;
  font-size: 16px;

  display: block;
`;

export const CartItemPrice = styled("span")`
  font-family: 'Raleway', sans-serif;
  font-weight: 500;
  font-size: 16px;

  display: block;
`;

export const CountButton = styled("button")`
  position: relative;

  width: 24px;
  height: 24px;

  border: 1px solid #1D1F22;
  background-color: #FFFFFF;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;

export const CountButtonsContainer = styled("div")`
  height: 100px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const CartProductImage = styled.img`
  width: 120px;

  object-fit: contain;
`;
