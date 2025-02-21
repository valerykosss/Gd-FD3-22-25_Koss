import { createContext, ReactNode, useContext, useState } from 'react'

export type NameContext = {
    name: string;
    setName: (name: string) => void;
}

//внутри значение по умолчанию - объект - который будет приводится к NameContext

export const nameContext = createContext<NameContext>({} as NameContext);

export const useNameContext = () => useContext(nameContext);

//провайдер - обертка, в него child'ов прокидываем
export const NameProvider = (props: {children?: ReactNode }) => {
    const [name, setName] = useState('');
    return <nameContext.Provider value = {{ name, setName }}>{props.children}</nameContext.Provider>
}
