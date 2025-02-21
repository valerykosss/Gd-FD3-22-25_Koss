import { useEffect } from "react";
import { action, useTypedSelector } from "../store";
import { useDispatch } from "react-redux";
import { v4 } from 'uuid';

export default function TodosPage() {
    const { todos } = useTypedSelector((store) => store.todosSlice);

    const dispatch = useDispatch();
    console.log("#TodosPage", todos);

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

    return <>
        <h4>TodosPage</h4>

        <div>
            <button onClick={addTodoHandler}>Add TODO:</button>
        </div>

        <div>{todos.map((todo) => <>
        <label style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            <input 
                type="checkbox" 
                checked={todo.completed} 
                onChange={() => dispatch(action.todosSlice.toggle(todo.id))}/>
            #{todo.id} {todo.title}
        </label><br />
        </>)}</div>
    </>;
}