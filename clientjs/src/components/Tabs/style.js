import styled from 'styled-components';
import { Link } from "react-router-dom";

export const CategoryButton = styled.button`
text-decoration: none;
border: none;
background: none;
text-transform: uppercase;
text-align: center;
color: ${props => props.active ? "#5ECE7B" : "#1D1F22"};
border-bottom: ${props => props.active ? "2px solid #5ECE7B" : "none"};
padding: 10px;
font-size: 16px;
height: 80px;
box-sizing: border-box;
cursor: pointer;
`;

export const TabsContainer = styled("div")`
  display: flex;
  align-items: center;
`;

export const CategoryLink = styled(Link)`
  font-family: 'Raleway', sans-serif;
  font-weight: 400;
  text-decoration: none;
  border: none;
  line-height: 60px;
  background: none;
  text-transform: uppercase;
  text-align: center;
  color: ${props => props.active ? "#5ECE7B" : "#1D1F22"};
  border-bottom: ${props => props.active ? "2px solid #5ECE7B" : "none"};
  padding: 10px;
  font-size: 16px;
  display: block;
  height: 80px;
  box-sizing: border-box;
  cursor: pointer;
`