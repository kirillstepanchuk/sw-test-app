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

export const AttributeOuterContainer = styled("div")`
  display: flex;
`;

export const AttributeSwatchContainer = styled("div")`
  position: relative;

  width: 32px;
  height: 32px;
  margin: 8px 12px 8px 0;

  border: 1px solid #D3D2D5;

  background-color: ${({ colorHex }) => colorHex};

  ${({ type }) => type === "overlayCart"
    ? `
      width: 16px;
      height: 16px;
      margin: 4px 6px 4px 0;
    ` : `
      cursor: pointer;
  `};

  ${({ active }) => !active && css`
    &:before {
      content: "";

      position: absolute;
      top: -3px;
      left: -3px;

      width: 36px;
      height: 36px;

      border: 1px solid #5ECE7B;

      box-sizing: border-box;
    }
  `}

  ${({ active, type }) => (!active && type === "overlayCart") && css`
    &:before {
      top: -3px;
      left: -3px;

      width: 20px;
      height: 20px;
    }
  `}
`;

export const AttributeInnerContainer = styled("div")`
  font-family: "Source Sans Pro", sans-serif;
  font-size: 16px;
  font-weight: 400;
  margin: 8px 12px 8px 0;
  padding: 13px 20px;

  border: 1px solid #1d1f22;

  ${({ type }) => type === "overlayCart"
    ? `
      margin: 4px 6px 4px 0;
      padding: 6px 13px;
    ` : type === "singleProduct" && `
      cursor: pointer;
  `};

  ${({ active }) => active && `
    color: #ffffff;
    background-color: #1d1f22;
  `}
`;

export const AttributeValue = styled("span")``;
