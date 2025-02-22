import { Link, Outlet } from "react-router";
import { LinkStyled, NavStyled } from "../components/layouts/Header";
import styled from "styled-components";

export const Heading = styled.h1`
    font-size: 40px;
    font-weight: 800;
    color: #232323;
    margin: 0;
`;

export default function ContactPage() {
    return (<>
        <Heading>Click the link below</Heading>
        <NavStyled background="white">
            <LinkStyled color="black" to="about">About</LinkStyled>
            <LinkStyled color="black" to="terms">Terms</LinkStyled>
        </NavStyled>
        <div>
          <Outlet />
        </div>
    </>)
}