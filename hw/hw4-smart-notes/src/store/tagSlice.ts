import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuid} from "uuid";
import { TagType } from '../types/TagType';

type TagState = {
  tags: TagType[];
  selectedTag?: TagType | null;
}

const initialState: TagState = {
    tags: [],
    selectedTag: null,
};

const tagSlice = createSlice({
    name: 'tag',
    initialState,
    reducers: {
      init(state, action: PayloadAction<TagType[]>) {
        state.tags = action.payload;
      },
      addTag(state, action: PayloadAction<TagType>) {
        state.tags.push(action.payload);
      },
      updateTag(state, action: PayloadAction<TagType>) {
          const noteIndex = state.tags.findIndex(tag => tag.id === action.payload.id);
          if (noteIndex !== -1) {
            state.tags[noteIndex] = action.payload;
          }
      },
      deleteTag(state, action: PayloadAction<TagType['id']>) {
        const tagIndex = state.tags.findIndex(tag => tag.id === action.payload);
          if (tagIndex !== -1) {
          state.tags.splice(tagIndex, 1);
        }
      },
      selectTag(state, action: PayloadAction<TagType | null>) {
        state.selectedTag = action.payload;
      },
    },
  })

  export default tagSlice;