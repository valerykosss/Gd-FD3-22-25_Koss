import { TypedUseSelectorHook, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import noteSlice from "./noteSlice";
import tagSlice from "./tagSlice";

export const action = {
    noteSlice: noteSlice.actions,
    tagSlice: tagSlice.actions
}

const store = configureStore({
    reducer: {
        noteSlice: noteSlice.reducer,
        tagSlice: tagSlice.reducer,
    }
});

//значение результата выполнения функции store
export type RootState = ReturnType<typeof store.getState>;

//useSelector –– позволяет извлекать данные из состояния(state) хранилища(store) Redux с помощью функции селектора.
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;