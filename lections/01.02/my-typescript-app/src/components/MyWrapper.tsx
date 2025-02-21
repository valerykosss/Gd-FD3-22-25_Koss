import { ReactNode } from "react";
// import './MyWrapper.css'
import style from './MyWrapper.module.css'
import { useColorThemeContext } from "../contexts/themeContext";

type MyWrapperProps = {
    //? потому что необязательный
    children?: ReactNode | ReactNode[];
};

export default function MyWrapper(props: MyWrapperProps) {
    console.log("#MyWrapper", props, Array.isArray(props));

    const { theme } = useColorThemeContext();
    
    const divCN = theme==='light' ? `${style.base} ${style.light}` : `${style.base} ${style.dark}`;

    return <div className={divCN}>
        {props.children}
    </div>
}