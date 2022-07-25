import styled from 'styled-components';

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

/* &:hover {
  color: #5ECE7B;
  border-bottom: 2px solid #5ECE7B;
  transition: 0.5s;
} */
`;