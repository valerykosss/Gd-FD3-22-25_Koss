import { ReactNode } from "react";

type MyWrapperProps = {
    //? потому что необязательный
    children?: ReactNode | ReactNode[];
};

export default function MyWrapper(props: MyWrapperProps) {
    console.log("#MyWrapper", props, Array.isArray(props));
    return <div className="MyWrapper">
        {props.children}
    </div>
}