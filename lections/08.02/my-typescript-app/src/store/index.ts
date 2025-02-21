import { TypedUseSelectorHook, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./toDoSlice";
import messageSliceReducer from "./messageSlice";
import nameSlice from "./nameSlice";
import todosSlice from "./toDoSlice";
// import nameReducer from "./nameSlice";

//тут пример с неймингом, если названия функций пишутся без префиксов, есть вероятность, что названия редьюсеров совпадут с названиями редьюсеров в другом слайсе, решение - импортировать nameSlice из nameSlice, работать здесь с целым куском nameSlice

export const action = {
    // можно переписать на такой подход и message
    // messageSlice
    nameSlice: nameSlice.actions,
    todosSlice: todosSlice.actions
    //dispatch(action.nameSlice.input({ name, lastName })); в InputComponent используется теперь так
}

export const store = configureStore({
    reducer: {
        //1 подход
        messageSlice: messageSliceReducer,

        //2 подход
        nameSlice: nameSlice.reducer,
        todosSlice: todosSlice.reducer
    }
});

//значение результата выполнения функции store
export type ReduxStore = ReturnType<typeof store.getState>;

//хук useTypedSelector тот же, что и useSelector, только затипизироваанный
export const useTypedSelector: TypedUseSelectorHook<ReduxStore> = useSelector;