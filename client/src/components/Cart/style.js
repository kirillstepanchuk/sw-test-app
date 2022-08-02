import styled from "styled-components";
import { Link } from "react-router-dom";

export const CartContainer = styled("div")`
  padding-top: 160px;
`;

export const Container = styled("div")`
  margin-top: 50px;

  display: flex;
  flex-direction: column;

  border-bottom: 1px solid #e5e5e5;
`;

export const Heading = styled("span")`
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-size: 32px;
`;

export const CartItemContainer = styled("div")`
  border-top: 1px solid #e5e5e5;
`;

export const EmptyCartContainer = styled("div")`
  width: 100%;
  height: 300px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const EmptyCartMessage = styled("span")`
  font-family: 'Raleway', sans-serif;
  font-weight: 400;
  font-size: 32px;
`;

export const EmptyCartButton = styled(Link)`
  display: block;

  font-family: 'Raleway', sans-serif;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  color: #ffffff;
  line-height: 42px;
  text-align: center;

  width: 200px;
  height: 43px;

  margin-top: 40px;

  border: none;
  background-color: #5ECE7B;

  cursor: pointer;
`;

export const BottomCartContainer = styled("div")`
  width: 200px;
  margin-top: 20px;
`;

export const BottomCartInfo = styled("div")`
  font-family: "Raleway", sans-serif;

  margin-bottom: 8px;

  display: flex;
`;

export const BottomCartLabel = styled("span")`
  font-weight: ${({ fontWeight }) => (fontWeight === "medium" ? 500 : 400)};

  width: 100px;

  display: block;
`;

export const BottomCartValue = styled("span")`
  font-weight: 700;
`;

export const OrderButton = styled("button")`
  display: block;

  font-family: 'Raleway', sans-serif;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  color: #ffffff;
  line-height: 42px;
  text-align: center;

  width: 100%;
  height: 43px;

  margin-bottom: 40px;

  border: none;
  background-color: #5ECE7B;

  cursor: pointer;
`;