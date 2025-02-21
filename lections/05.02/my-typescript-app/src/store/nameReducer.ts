export const NAME_ACTION__INPUT = 'nameState/input'
export type ReduxAction = {
    type: typeof NAME_ACTION__INPUT;
    name: string;
    lastName: string;
}

const initState = {
    name: '',
    lastName: '',
};

//функция, кот преобразует один стейт в другой(текущий экшн, стейт, с кот работает)
export function nameReducer(state = initState, action: ReduxAction) {
    //убедиться, что пришло. если пришел input, то подставить значение message. то есть делает изменение в state на основе какого-либо действия
    console.log('#nameReducer', JSON.stringify({ action, state }));

    switch(action?.type) {
        case NAME_ACTION__INPUT: 
            return {
                name: action.name,
                lastName: action.lastName,
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