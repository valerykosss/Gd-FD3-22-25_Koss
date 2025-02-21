import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type NameState = {
    name: string;
    lastName: string;
}

type NameInputAction = PayloadAction<NameState>

const initialState: NameState = {
    name: '',
    lastName: '',
};

const nameSlice = createSlice({
    name: 'name',
    initialState,
    reducers: {
      //тут nameInput - функция-редьюсер
      input(state, action: NameInputAction) {
        state.lastName = action.payload.lastName;
        state.name = action.payload.name;
      },
    },
  })

  //тут nameInput - action creator с типом payload (rtk сам подставит тип)

  export default nameSlice;