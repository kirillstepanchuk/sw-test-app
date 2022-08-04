import styled from "styled-components";

export const Container = styled("div")`
  width: 100%;

  padding-top: 120px;
  padding-bottom: 140px;

  display: flex;
`;

export const ImageContainer = styled("div")`
  display: flex;
  justify-content: space-between;
`;

export const SmallImageContainer = styled("div")`
  display: flex;
  flex-direction: column;

  width: 80px;
`;

export const SmallImage = styled("img")`
  width: 100%;
  height: 100%;
  object-fit: contain;
  
  margin-bottom: 40px;

  cursor: pointer;

  transition: 0.5s;

  &:hover {
    transform: scale(1.1);
  }
`;

export const CurrentImageContainer = styled("div")`
  width: 610px;
  height: 511px;
  margin-right: 80px;
  margin-left: 32px;
`;

export const CurrentImage = styled("img")`
  width: 100%;
  height: 100%;

  object-fit: contain;
`;

export const InfoContainer = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const Title = styled("span")`
  font-family: "Raleway", sans-serif;
  font-weight: 600;
  font-size: 30px;
`;

export const SubTitle = styled("span")`
  font-family: "Raleway", sans-serif;
  font-weight: 400;
  font-size: 30px;

  margin-top: 16px;
  margin-bottom: 16px;
`;

export const Price = styled("span")`
  font-family: "Roboto Condensed", sans-serif;
  font-weight: 700;
  font-size: 18px;

  margin-top: 40px;
  margin-bottom: 10px;
`;

export const PriceValue = styled("span")`
  font-family: "Raleway", sans-serif;
  font-weight: 700;
  font-size: 24px;
`;

export const AddCartContainer = styled("div")`
  font-family: "Raleway", sans-serif;
  font-weight: 600;
  font-size: 16px;

  margin-top: 20px;

  width: 292px;
  height: 52px;
  background-color: #5ECE7B;
  color: #ffffff;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: 0.5s;

  cursor: pointer;

  &:hover {
    color: #1D1F22;

    border: 1px solid #1D1F22;
    background-color: #ffffff;
  }
`;

export const AddCart = styled("span")``;

export const OutOfStockContainer = styled("div")`
  font-family: "Raleway", sans-serif;
  font-weight: 600;
  font-size: 16px;

  padding-top: 40px;
  padding-bottom: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Description = styled("div")`
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-size: 16px;

  padding-top: 40px;
`;
