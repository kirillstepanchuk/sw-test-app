import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const CategoryButton = styled.button`
text-decoration: none;
border: none;
background: none;
text-transform: uppercase;
text-align: center;
color: #1D1F22;
padding: 10px;
font-size: 16px;
height: 80px;
box-sizing: border-box;

&:hover {
  color: #5ECE7B;
  border-bottom: 2px solid #5ECE7B;
  transition: 0.5s;
}
`;