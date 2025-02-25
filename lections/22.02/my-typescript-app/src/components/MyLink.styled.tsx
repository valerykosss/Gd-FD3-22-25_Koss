//styled components
import { Link } from "react-router";
import styled, { css } from "styled-components";
import { ColorTheme } from "../contexts/themeContext";
// import { Link } from "react-router";

export const MyTagAStyled = styled('a')<{ 
   variant?: 'text' | 'outlined'; 
   theme: ColorTheme;
}>`
 color: ${({theme }) => theme === 'light' ? "#28577b" : "#87b7db"} ;
 text-decoration: none;
 border-radius: 10px;
 padding: 5px;


 &:hover {
   color: ${({theme }) => theme === 'light' ? "#5890bb" : "#f1f1f1"} ;
 }

 ${({ variant, theme}) => {
    if (variant === 'outlined') {
        console.log(variant);
        return css`
            border: 1px solid ${theme === 'light' ? "#28577b" : "#87b7db"};

            &:hover {
                border: 1px solid #87b7db;
            }
    `;
    }
 }};
`;



export const MyLinkStyled = styled(Link)<{ 
   variant?: 'text' | 'outlined'; 
   theme: ColorTheme;
}>`
 color: ${({theme }) => theme === 'light' ? "#28577b" : "#87b7db"} ;
 text-decoration: none;
 border-radius: 10px;
 padding: 5px;

 &:hover {
   color: ${({theme }) => theme === 'light' ? "#5890bb" : "#f1f1f1"} ;
 }

 ${({ variant, theme}) => {
    if (variant === 'outlined') {
        console.log(variant);
        return css`
            border: 1px solid ${theme === 'light' ? "#28577b" : "#87b7db"};

            &:hover {
                border: 1px solid #87b7db;
            }
    `;
    }
 }};
`;