import styled from "styled-components";

export const DropDownContainer = styled("div")`
  font-family: 'Raleway', sans-serif;
  font-weight: 500;

  position: relative;
  margin-right: 22px;

  z-index: 2;
`;

export const DropDownHeader = styled("div")`
  background: #ffffff;

  width: 38px;
  height: 29px;
  font-size: 18px;
  padding-left: 15px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  cursor: pointer;
  box-sizing: border-box;
`;

export const DropDownArrowImage = styled("img")`
  width: 8px;
  height: 4px;

  transform: ${(props) =>
    props.isSelectOpen ? "rotate(180deg)" : "rotate(0deg)"};
`;

export const DropDownList = styled("ul")`
  position: absolute;
  top: 29px;
  padding: 0;
  margin: 0;
`;

export const ListItem = styled("li")`
  list-style: none;
  background-color: #ffffff;
  margin: 0;
  font-size: 18px;
  width: 114px;
  height: 45px;

  display: flex;
  padding-left: 15px;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #eeeeee;
  }
`;