// import { useContext } from "react";
import { useEffect, useState } from "react";
// import { nameContext } from "../contexts/nameContext";
import { useNameContext } from "../contexts/nameContext";

const LOCAL_STORAGE_KEY = 'ita-key';
const TIMEOUT_MS = 3000;

type SavedJSON = {
    message: string,
    age: number
}

export type InputWithSaveProps = {
    setName?: (name: string) => void;
}

//save many items
//try-catch
//delay 

export default function InputWithSave(props: InputWithSaveProps) {
    const [message, setMessage] = useState('');
    // const [age, setAge] = React.useState<number>(0);
    const [age, setAge] = useState(NaN);

    const [savedMessage, setSavedMessage] = useState('');
    const [savedAge, setSavedAge] = useState(NaN); //тут может быть null, если у input не указать type='number'

    const [loading, setLoading] = useState(false);


    function save() {
        setLoading(true);

        setTimeout(() => {
            const data: SavedJSON = {
                message,
                age,
            };

            console.log("Saving data:", data);
    
            //класть все в один большой ключик
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
            setLoading(false)
        }, TIMEOUT_MS)

        // //объект js в длинную строку формата специального
        // JSON.stringify({
        //     message,
        //     age,
        // }); //'{"message":"...", "age":"..."}'

        // const obj = JSON.parse('{"message":"...", "age":"..."}');
    }


    function load() {
        try {
            const lsMessage = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (lsMessage) {
                const parsed: SavedJSON = JSON.parse(lsMessage);
                setSavedMessage(parsed.message);
                setSavedAge(parsed.age)
            }
        } catch(error) {
            console.error('error')
        }
    }

    //будем грузить данные из LocalStorage для первого рендера
    useEffect(() => {
        load();
    }, [])

    //хотелосб бы пропустить весь useEffect, если не указан setName, но по правилам хуков эффекты не пропускаются, поэтому оборачиваем в if
    useEffect(() => {
        if (props.setName) {
            props.setName(message);
        }
    }, [message, props.setName])

    //вместо верхней функции c [message, props.setName]) - работаем с контекстом
    
    // const {name, setName} = useContext(nameContext);
    const {name, setName} = useNameContext();
    
    useEffect(() => {
        setName(message);
    }, [message])



    return <>
        <input onChange={(event) => setMessage(event.target.value)}/>
        <input type="number" onChange={(event) => setAge(event.target.valueAsNumber)}/>

        <button onClick={save} disabled={loading}>
            {loading ? 'loading...' : 'Save'}
        </button>
        <br />

        <p>Saved M: {savedMessage}</p>
        <p>Saved A: {savedAge}</p>
        <button onClick={load}>Refresh</button>
    </>
}
/*setItem, removeItem, getItem */
/*все хранимые значения - строки , ПОЭТОМУ все, что хотим положить, пишем с помощью JSON.paerse, JSON.stringify*/
/* не забывать чистить за собой, не безопасен, содержит данные других сайтов*/

/*session_storage хранится до закрытия браузера/выключения компьютера */

/*куками нельзя управлять со стороны фронтенда, можно получить со стороны фронта, можем почистить */

/*indexed db используется в офлайн приложениях */