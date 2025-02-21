import { useEffect, useState } from "react";
// import { store } from "../store"

//import { actionMessageAdd, MESSAGE_ACTION__UPDATE, MESSAGE_ACTION__DELETE } from "../store/messageReducerNew";
import { actionMessageAdd, actionMessageUpdate, actionMessageDelete } from "../store/messageReducerNew";
import { useDispatch, useSelector, useStore } from "react-redux";
import { useTypedSelector } from "../store";


export default function Notes() {

    //для redux
    // const [storedMessage, setStoredMessage] = useState();

    //для react redux
    const storedMessage = useTypedSelector((store) => store.messageState.message);

    const dispatch = useDispatch();

    //для redux
    // // useEffect(() => {
    //     const unsubscribe = store.subscribe(() => {
    //         const state = store.getState();
    //         console.log('#Store1', store.getState());

    //         setStoredMessage(state.messageState.message);
    //     });

    //         // return unsubscribe();
    // // }, [])

    function addHandler() {
        const text = prompt("Enter Message");

        if (text) {
            //store.dispatch( {type: MESSAGE_ACTION__ADD, message: text} )

            // //в redux
            // store.dispatch(actionMessageAdd(text))

            //в react redux
            console.log("entered text", text);
            dispatch(actionMessageAdd(text))
        }
    }

    function updateHandler() {
        // //в redux
        // //decompose 
        // const { message } = store.getState();

        //const text = prompt('Enter Message ', message);
        const text = prompt('Enter Message ', storedMessage);

        if (text) {
            // //в redux
            // store.dispatch(actionMessageUpdate(text))
            
            //в redux react
            dispatch(actionMessageUpdate(text))
        }
    }

    function deleteHandler() {
        const confirmed = window.confirm('Delete Message');

        if(confirmed) {
            // //в redux
            // store.dispatch(actionMessageDelete())

            //в react redux
            dispatch(actionMessageDelete())
        }
        
    }

    // console.log(storedMessage);
    return <>
         {/* <button onClick={() => store.dispatch({type: 'input', message: 'clicked'})}>Add</button>
         <button onClick={() => store.dispatch({type: 'input', message: 'clicked'})}>Update</button>
         <button onClick={() => store.dispatch({type: 'input', message: 'clicked'})}>Delete</button> */}

        <button onClick={addHandler}>Add</button>
        <button onClick={updateHandler}>Update</button>
        <button onClick={deleteHandler}>Delete</button>
        <p>{storedMessage}</p>
    </>

}