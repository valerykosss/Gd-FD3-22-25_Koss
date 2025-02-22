import styled from "styled-components";

const FooterStyled = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #232323;
  padding: 10px;
  font-size: 20px;
  height: 70px;
  text-align: center;
  color: white;
`;

export default function Footer() {
    return <FooterStyled><p>(c) 2025</p></FooterStyled>
}