import { act, useEffect, useState } from "react";
import { action, useTypedSelector } from "../store";
import { useDispatch } from "react-redux";
import { ToDo } from "../store/toDoSlice";
import { getComments, getPosts, getTodos } from "../api/jsonplaceholder";

type JSONServerTodo = {
    userId: number;
    id: number;
    title: string;
    completed: boolean
};


type CallbackFunction = (error: Error | null, data?: any | null) => void;

// //1 вариант - callback
// function getTodos(callback: CallbackFunction) {
//     fetch('https://jsonplaceholder.typicode.com/todos')
//     .then(response => response.json())
//     .then((json: JSONServerTodo[]) => {
//         callback(null, json)
//     })
//     .catch((error) => callback(error));
// }

// //2 вариант - promise
// function getTodos() {
//     return fetch('https://jsonplaceholder.typicode.com/todos')
//     .then(response => response.json())
//     .then((json: JSONServerTodo[]) => {
//         return json;
//     });
// }

//3 вариант - async await - api -> jsonplaceholder.ts
// async function getTodos() {
//         const response = await fetch('https://jsonplaceholder.typicode.com/todos');
//         const json = await response.json();
    
//         return json as JSONServerTodo[];
// }

export default function TodosPageFilterVariant2() {
    const { filteredTodos } = useTypedSelector((store) => store.todosSlice);
    const dispatch = useDispatch();
    // console.log("#TodosPage", todos);

    //async функцию нельзя передавать в useEffect
    useEffect(() => {
         async function load() {

            //загрузятся одновременно all - если хоть какой-то не загрузится, загрузятся остальные 
            //.allSetled - если первый попавшийся не выполнится - выбросит ошибку всего промиса
            
            // const [
            //     data,
            //     dataPosts, 
            //     dataComments
            // ] = await Promise.all([getTodos(), getPosts(), getComments()])

            const data = await getTodos();
            // const dataPosts = await getPosts();
            // const dataComments = await getComments();

            dispatch(action.todosSlice.load(data));
            console.log('data', data);
            // console.log('dataPosts', dataPosts);
            // console.log('dataComments', dataComments);
        }
        load();

        
        //3.2 менее предпочтительно
        // getTodos()
        //     .then((data) => dispatch(action.todosSlice.load(data)));

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
        dispatch(action.todosSlice.filter({search: value ?? ''}))
    }

    return <>
        <h4>TodosPage</h4>

        <div>
            <button onClick={addTodoHandler}>Add TODO:</button>
            <input type="text" onChange={(e) => searchHandler(e.target.value)} />
        </div>

        <div>{filteredTodos.map((todo) => <>
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