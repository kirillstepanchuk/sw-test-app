import styled, { css } from "styled-components";

export const AttributesContainer = styled("div")``;

export const Attributes = styled("div")`
  margin-top: 8px;
  margin-bottom: 8px;
`;

export const AttributeName = styled("span")`
  font-family: "Roboto Condensed", sans-serif;
  font-weight: 700;
  font-size: 18px;

  margin-top: 24px;

  ${({ type }) => type === "overlayCart" && `
    font-weight: 500;
    font-size: 15px;

    margin-top: 16px;
  `}
`;

export const AttributeContainer = styled("div")`
  display: flex;
`;

export const AttributeSwatchContainer = styled("div")`
  position: relative;

  width: 32px;
  height: 32px;
  margin: 8px 12px 8px 0;

  border: 1px solid #ffffff;
  box-shadow: inset 0 0 0 1px #ffffff;

  background-color: ${({ colorHex }) => colorHex};

  transition: .5s;

  ${({ type }) => type === "overlayCart" && `
    width: 16px;
    height: 16px;
    margin: 4px 6px 4px 0;
  `}

  ${({ active }) => !active && css`
    border-color: #5ECE7B;
    cursor: pointer;
  `}

  ${({ active, type }) => (active && type === "productDescription") && `
    &:hover {
      border-color: #1d1f22;
      cursor: pointer;
    };
  `}
`;

export const AttributeValueContainer = styled("div")`
  font-family: "Source Sans Pro", sans-serif;
  font-size: 16px;
  font-weight: 400;
  margin: 8px 12px 8px 0;
  padding: 13px 20px;

  border: 1px solid #1d1f22;

  transition: .5s;

  ${({ type }) => type === "overlayCart"
    ? `
      margin: 4px 6px 4px 0;
      padding: 6px 13px;
    ` : type === "productDescription" && `
      cursor: pointer;
  `};

  ${({ active }) => active && `
    color: #ffffff;
    background-color: #1d1f22;
  `};

  ${({ active, type }) => (!active && type === "productDescription") && `
    &:hover {
      color: #ffffff;

      border-color: #5ECE7B;
      background-color: #5ECE7B;
    }
  `};
`;

export const AttributeValue = styled("span")``;
