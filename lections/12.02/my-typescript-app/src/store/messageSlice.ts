import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type MessageAddAction = PayloadAction<string>
type MessageUpdateAction = PayloadAction<string>
type MessageDeleteAction = PayloadAction;

const initialState = {
    message: '',
};

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        messageAdd(state, action: MessageAddAction) {
            state.message = action.payload;
        },
        messageUpdate(state, action: MessageUpdateAction) {
            state.message = action.payload;
        },
        messageDelete(state, action: MessageDeleteAction) {
            state.message = '';
        },
    }
});  

export const { 
    messageAdd, 
    messageUpdate, 
    messageDelete 
} = messageSlice.actions;

const messageSliceReducer = messageSlice.reducer;
export default messageSliceReducer;