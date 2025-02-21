import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { JSONServerPost } from '../api/jsonplaceholder';

type PostState = {
  posts: JSONServerPost[];
  selectedPost?: JSONServerPost | null;
}

const initialState: PostState = {
    posts: [],
    selectedPost: null,
};

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
      //тут nameInput - функция-редьюсер
      init(state, action: PayloadAction<JSONServerPost[]>) {
        state.posts = action.payload;
      },
      initPost(state, action: PayloadAction<JSONServerPost>) {
        state.selectedPost = action.payload;
      },
      select(state, action: PayloadAction<string | number>) {
        state.selectedPost = state.posts.find(post => +post.id === action.payload);
      },

      unselect(state) {
        state.selectedPost = null;
      },

    },
  })

  //тут nameInput - action creator с типом payload (rtk сам подставит тип)

  export default postSlice;