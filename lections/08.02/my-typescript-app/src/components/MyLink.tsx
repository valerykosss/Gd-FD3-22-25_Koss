import { ReactNode } from 'react';
import { MyTagAStyled, MyLinkStyled } from './MyLink.styled'
import { useColorThemeContext } from '../contexts/themeContext';

export type MyLinkProps = {
  // label: string;
  url: string;
  isInternal?: boolean;
  children: ReactNode;
  variant?: 'text' | 'outlined';// | 'contained';
}

//props - объект с аттрбутами
export default function MyLink(props: MyLinkProps) {
  console.log('#MyLink', props);

  const { theme } = useColorThemeContext();

  //внутренняя ссылка
  const isInternal = props.isInternal
    || props.url.startsWith('./')
    || props.url.startsWith('/');


  return ( isInternal ?
  <MyLinkStyled 
  to={props.url}
  variant={props.variant ?? 'text'}
  theme={theme}>
    {props.children}
  </MyLinkStyled> 

  : <MyTagAStyled
    className="App-link"
    href= {props.url}
    target="_blank"
    rel="noopener noreferrer"
    variant={props.variant ?? 'text'}
    theme={theme}
  >
  {props.children}
</MyTagAStyled>);
}