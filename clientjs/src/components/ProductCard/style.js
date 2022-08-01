import styled from "styled-components";

export const AddToCartButton = styled("button")`
  opacity: 0;

  position: absolute;
  right: 31px;
  bottom: 72px;

  width: 52px;
  height: 52px;

  border-radius: 50%;
  border: none;
  background-color: #5ECE7B;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  transition: all 0.3s ease;
`;

export const CardContainer = styled("div")`
  position: relative;

  width: 386px;
  height: 444px;

  padding: 15px;

  opacity: ${props => props.inStock ? "1" : ".5"};

  &:hover {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  }

  &:hover ${AddToCartButton} {
    opacity: 1;
  }
`;

export const CardImage = styled("img")`
  width: 100%;
  height: 330px;
  object-fit: contain;
`;

export const CardTitle = styled("span")`
  font-family: 'Raleway', sans-serif;
  font-weight: 300;

  display: block;
  font-size: 18px;

  padding-top: 24px;
`;

export const CardPrice = styled("span")`
  font-family: 'Raleway', sans-serif;
  font-weight: 500;

  display: block;
  font-size: 18px;
`;

export const OutOfStockTitle = styled("span")`
  font-family: 'Raleway', sans-serif;
  font-weight: 400;

  position: absolute;
  top: 145px;
  left: 90px;

  font-size: 24px;
  color: #8D8F9A;
`;