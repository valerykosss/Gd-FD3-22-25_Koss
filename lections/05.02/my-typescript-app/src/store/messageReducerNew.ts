//actions
export const MESSAGE_ACTION__ADD = 'message/add';
export const MESSAGE_ACTION__UPDATE = 'message/update';
export const MESSAGE_ACTION__DELETE = 'message/delete';

//types
export type ReduxAction = {
    type: typeof MESSAGE_ACTION__ADD 
    | typeof MESSAGE_ACTION__UPDATE  
    | typeof MESSAGE_ACTION__DELETE;
    message?: string;
}

//actionCreators
export function actionMessageAdd(message: string) {
    return { type: MESSAGE_ACTION__ADD, message}
}

export function actionMessageUpdate(message: string) {
    return { type: MESSAGE_ACTION__UPDATE, message}
}

export function actionMessageDelete() {
    return { type: MESSAGE_ACTION__DELETE}
}

//reducer-file
const initState = {
    message: '',
};

export function messageReducer(state=initState, action: ReduxAction) {
    switch(action?.type) {
        case MESSAGE_ACTION__ADD: 
            return {
                message: action.message,
            };
        case MESSAGE_ACTION__UPDATE: 
            return {
                message: action.message,
            };
        case MESSAGE_ACTION__DELETE: 
            return {
                message: action.message,
            };
        default:
            return state;
    }
}