import { Link } from "react-router"
import styled from 'styled-components';

export const NavStyled = styled.nav<{ background ?: string }>`
background: ${({ background }) => background || "#232323"};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 10px;
  height: 100px;
`;

export const LinkStyled = styled(Link)<{ color?: string }>`
  color: ${({ color }) => color || "white"};
  position: relative;
  text-decoration: none;
  font-size: 28px;
  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -8px;
    width: 0;
    height: 2px;
    background-color: ${({ color }) => color || "white"};
    transition: width 0.3s ease-in-out;
  }

  &:hover::after {
    width: 100%;
  }
`;

export default function Header() {
    return (<NavStyled>
        <LinkStyled to="/">Start Page</LinkStyled>
        <LinkStyled to="/contact">Contact</LinkStyled>
        <LinkStyled to="/posts">Posts</LinkStyled>
  </NavStyled>)
}