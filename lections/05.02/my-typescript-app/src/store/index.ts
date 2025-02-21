import { combineReducers, createStore } from "redux";
import { messageReducer } from "./messageReducerNew";
import { nameReducer } from "./nameReducer";
import { TypedUseSelectorHook, useSelector } from "react-redux";

const combined = combineReducers({
    //результат state messageReducer попадет в messageState
    messageState: messageReducer,
    nameState: nameReducer,
});

export const store = createStore<any, any>(combined);

//значение результата выполнения функции combined
export type RootState = ReturnType<typeof combined>;

//хук useTypedSelector тот же, что и useSelector, только затипизироваанный
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

//не console.log() потому что функция не немедленно должна вызываться, а просто передается 

// //только для редакс, для реакт редакс уже не нужен
// store.subscribe(() => console.log('#store: ', store.getState())) 