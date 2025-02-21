import { useEffect, useState } from "react";
// import { store } from "../store"

//import { actionMessageAdd, MESSAGE_ACTION__UPDATE, MESSAGE_ACTION__DELETE } from "../store/messageReducerNew";
import { messageAdd, messageUpdate, messageDelete } from "../store/messageSlice";
import { useDispatch, useSelector, useStore } from "react-redux";
import { useTypedSelector } from "../store";

import { action } from '../store/index'



export default function Notes() {

    const storedMessage = useTypedSelector((store) => store.messageSlice.message);

    const dispatch = useDispatch();


    function addHandler() {
        const text = prompt("Enter Message");

        if (text) {
            console.log("entered text", text);
            dispatch(messageAdd(text))
        }
    }

    function updateHandler() {
        const text = prompt('Enter Message ', storedMessage);

        if (text) {
            dispatch(messageUpdate(text))
        }
    }

    function deleteHandler() {
        const confirmed = window.confirm('Delete Message');

        if(confirmed) {
            dispatch(messageDelete())
        }
        
    }

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