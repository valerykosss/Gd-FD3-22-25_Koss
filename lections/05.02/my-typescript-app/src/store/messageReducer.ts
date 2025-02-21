export type ReduxAction = {
    type: 'add' | 'update' | 'delete';
    message?: string;
}

const initState = {
    message: '',
};

//функция, кот преобразует один стейт в другой(текущий экшн, стейт, с кот работает)
export function messageReducer(state = initState, action: ReduxAction) {
    //убедиться, что пришло. если пришел input, то подставить значение message. то есть делает изменение в state на основе какого-либо действия
    console.log('#messageReducer', JSON.stringify({ action, state }));

    switch(action?.type) {
        case 'add': 
            return {
                message: action.message,
            }
        case 'update': 
            return {
                message: action.message,
            }
        case 'delete': 
            return {
                message: action.message,
            }
        default:
            return state;
        
    }


    // if (action?.type === 'add') {
    //     return {message: action.message}
    // }

    // if (action?.type === 'update') {
    //     return {message: action.message}
    // }

    // if (action?.type === 'delete') {
    //     return {message: action.message}
    // }

}