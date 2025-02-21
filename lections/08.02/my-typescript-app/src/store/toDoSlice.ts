import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 } from 'uuid';

type ToDo = {
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
}

//[] - массив ToDo
type LoadPayload = PayloadAction<ToDo[]>;
type AddPayload = PayloadAction<AddTodo>;

//['id'] - то чо сейчас лежит в ToDo по ключу id
//PayloadAction<ToDo['id']> значит "Забрать тип id из типа ToDo"
type TogglePayload = PayloadAction<ToDo['id']>;

const initialState: State = {
    todos: [], // array as todos array
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    load(state, action: LoadPayload) {
        //все todo из payload кладем в изначальный массив
        state.todos = action.payload;
    },
    //state = slice, это редьюсер кусочка slice стора
    add(state, action: AddPayload) {
      const { title } = action.payload
      state.todos.push({
        id: v4().slice(0, 4),
        title,
        completed: false,
      })
    },
    toggle(state, action: TogglePayload) {
      const matchingTodo = state.todos.find(
        (todo) => todo.id === action.payload,
      )

      if (matchingTodo) {
        matchingTodo.completed = !matchingTodo.completed
      }
    },
  },
})

// export const { todoAdded, todoToggled } = todosSlice.actions;

// const todosReducer = todosSlice.reducer;
export default todosSlice;