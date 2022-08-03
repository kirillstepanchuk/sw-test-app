import styled from "styled-components";

export const CartItemContainer = styled("div")`
  display: flex;
  justify-content: space-between;

  margin-top: 24px;
  margin-bottom: 24px;
`;

export const LeftContentContainer = styled("div")`
  display: flex;
  flex-direction: column;
`;

export const ItemBrand = styled("span")`
  font-family: 'Raleway', sans-serif;
  font-weight: 600;
  font-size: 30px;

  margin-bottom: 16px;
`;

export const ItemName = styled("span")`
  font-family: 'Raleway', sans-serif;
  font-size: 30px;
  font-weight: 400;
`;

export const ItemPriceValue = styled("span")`
  font-family: 'Raleway', sans-serif;
  font-size: 24px;
  font-weight: 700;

  margin-top: 20px;
  margin-bottom: 20px;
`;

export const RightContentContainer = styled("div")`
  display: flex;
`;

export const QuantityContainer = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  margin-right: 20px;
`;

export const CountButton = styled("button")`
  position: relative;

  width: 45px;
  height: 45px;

  border: 1px solid #1D1F22;
  background-color: #FFFFFF;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  transition: .5s;

  &:hover {
    transform: scale(1.1);
  }
`;

export const ItemQuantity = styled("span")`
  font-family: 'Raleway', sans-serif;
  font-size: 24px;
  font-weight: 500;
`;

export const ImageContainer = styled("div")`
  width: 200px;
  height: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  position: relative;
`;

export const ItemImage = styled("img")`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const ArrowButton = styled("div")`
  width: 24px;
  height: 24px;
  background-color: #000000;
  opacity: .73;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  position: absolute;
  bottom: 20px;
  right: ${({ buttonDirection }) => (buttonDirection === "right" ? "16px" : "48px")};

  transition: .5s;

  &:hover {
    transform: scale(1.1);
  }
`;
