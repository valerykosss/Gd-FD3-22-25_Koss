import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 } from 'uuid';

export type ToDo = {
    id: number | string;
    title: string;
    completed: boolean;
}

//останется от ToDo толлько поле text.
//id и completed исключаются
type AddTodo = Omit<ToDo, 'id' | 'completed'>

//забрать только text
type AddTodoVariant2 = Pick<ToDo, 'title'>

type State = { 
    todos: ToDo[];
    filteredTodos: ToDo[];
    search: string
}

//[] - массив ToDo
type LoadPayload = PayloadAction<ToDo[]>;
type AddPayload = PayloadAction<AddTodo>;

//['id'] - то чо сейчас лежит в ToDo по ключу id
//PayloadAction<ToDo['id']> значит "Забрать тип id из типа ToDo"
type TogglePayload = PayloadAction<ToDo['id']>;
type FilterPayload = PayloadAction<{search: string}>

const initialState: State = {
    todos: [], // array as todos array
    filteredTodos: [],
    search: ''
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    load(state, action: LoadPayload) {
        //все todo из payload кладем в изначальный массив
        state.todos = action.payload;
        state.filteredTodos = state.todos;
    },
    //state = slice, это редьюсер кусочка slice стора
    add(state, action: AddPayload) {
      const { title } = action.payload
      state.todos.push({
        id: v4().slice(0, 4),
        title,
        completed: false,
      });
    },
    toggle(state, action: TogglePayload) {
      const matchingTodo = state.filteredTodos.find(
        (todo) => todo.id === action.payload,
      )

      if (matchingTodo) {
        matchingTodo.completed = !matchingTodo.completed
      }
    },
    filter(state, action: FilterPayload) {
      if (!action.payload.search) {
        //search не нужен - вернуть все элементы
        state.search = '';
        state.filteredTodos = state.todos;
        return;
    }
    const { search } = action.payload;
    state.search = search;

    const filteredNew = state.todos
        .filter(todo => todo.title.toLowerCase().includes(search.toLowerCase()))
        .map(todo => {
            //найти индекс начала подстроки
            //добавить <mark> по этому индексу
            //встроить </mark> окончания позиции value
            //отобразить mark как тег, а не как строку

            let title = todo.title;
            // 1 способ
            // const startIndex = title.indexOf(value);
            // title = title.slice(0, startIndex) + '<mark>' + title.slice(startIndex);

            // title = title.slice(0, startIndex + '<mark>'.length + value.length) 
            //     + '</mark>' 
            //     + title.slice(startIndex + '<mark>'.length + value.length);

            // 2 способ
            const parts = title.split(search);
            title = parts.join('<mark>' + search + '</mark>');

            return {
                ...todo,
                title
            }

            //eval('1+3') - result 4. выполнение скрипта из строки
        });
      state.filteredTodos = filteredNew;
    }
  },
})

// export const { todoAdded, todoToggled } = todosSlice.actions;

// const todosReducer = todosSlice.reducer;
export default todosSlice;