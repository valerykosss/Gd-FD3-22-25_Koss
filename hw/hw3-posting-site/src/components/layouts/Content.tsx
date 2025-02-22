import { ReactNode } from "react";
import styled from "styled-components";

type ContentProps = {
    children?: ReactNode | ReactNode[];
};

export const ContentWrapper = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function Content(props: ContentProps) {
    return (<ContentWrapper>
        {props.children}
    </ContentWrapper>
)}