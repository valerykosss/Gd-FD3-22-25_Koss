import { useEffect, useState } from "react";
import { action, useTypedSelector } from "../store";
import { useDispatch } from "react-redux";
import { v4 } from 'uuid';
import { ToDo } from "../store/toDoSlice";
import { start } from "repl";

export default function TodosPage() {
    //как вариант1
    const [filtered, setFiltered] = useState<ToDo[]>([]);
    const [search, setSearch] = useState('');

    //как варинт2(менее приятный)
    // тут тип не todo-массива, не всех todo, а именно тип от массива, у которого в качестве значения у индекса указан number
    // const [filtered, setFiltered] = useState<typeof todos[number]>();
    const { todos } = useTypedSelector((store) => store.todosSlice);

    const dispatch = useDispatch();
    // console.log("#TodosPage", todos);

    useEffect(() => {
        // setFiltered(todos);
        if (!search) {
            setFiltered(todos);
            //search не нужен - вернуть все элементы
            return;
        }

        const filteredNew = todos
            .filter(todo => todo.title.toLowerCase().includes(search.toLowerCase()))
            .map(todo => {
                //найти индекс начала подстроки
                //добавить <mark> по этому индексу
                //встроить </mark> окончания позиции value
                //отобразить mark как тег, а не как строку

                let title = todo.title;
                // const startIndex = title.indexOf(value);
                // title = title.slice(0, startIndex) + '<mark>' + title.slice(startIndex);

                // title = title.slice(0, startIndex + '<mark>'.length + value.length) 
                //     + '</mark>' 
                //     + title.slice(startIndex + '<mark>'.length + value.length);

                const parts = title.split(search);
                title = parts.join('<mark>' + search + '</mark>');

                return {
                    ...todo,
                    title
                }

                //eval('1+3') - result 4. выполнение скрипта из строки
            });

        setFiltered(filteredNew);
    }, [todos, search])

    useEffect(() => {
        // dispatch(action.todosSlice.load([
        //     {
        //         id: v4(),
        //         text: 'Some Text',
        //         completed: false
        //     },
        //     {
        //         id: v4(),
        //         text: 'Another',
        //         completed: true
        //     },
        //     {
        //         id: v4(),
        //         text: 'Doe John',
        //         completed: false
        //     }
        // ]));

        type JSONServerTodo = {
            userId: number;
            id: number;
            title: string;
            completed: boolean
        };
    
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then((json: JSONServerTodo[]) => dispatch(action.todosSlice.load(json)));

    }, [])

    function addTodoHandler() {
        const title = prompt('Введите todo title:');
        if (title) {
            dispatch(action.todosSlice.add({
                title,
            }));
        }
    }

    // function searchHandler(event: React.ChangeEvent<HTMLInputElement>) {
    function searchHandler(value?: string) {
        setSearch(value ?? '');
    }



    return <>
        <h4>TodosPage</h4>



        <div>
            <button onClick={addTodoHandler}>Add TODO:</button>
            {/* чтобы проверить тип, навести на e - вписать потом у event*/}
            {/* <input type="text" onChange={(e) => searchHandler} /> */}

            <input type="text" onChange={(e) => searchHandler(e.target.value)} />
        </div>

        <div>{filtered.map((todo) => <>
        <label style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            <input 
                type="checkbox" 
                checked={todo.completed} 
                onChange={() => dispatch(action.todosSlice.toggle(todo.id))}/>
            #{todo.id} <div dangerouslySetInnerHTML={{ __html: todo.title}}></div>
        </label><br />
        </>)}</div>
    </>;
}