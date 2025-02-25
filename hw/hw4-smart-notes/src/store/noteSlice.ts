import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuid} from "uuid";
import { NoteType } from '../types/NoteType';

type NoteState = {
  notes: NoteType[];
  selectedNote?: NoteType | null;
}

const initialState: NoteState = {
    notes: [],
    selectedNote: null,
};

const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
      init(state, action: PayloadAction<NoteType[]>) {
        state.notes = action.payload;
      },
      addNote(state, action: PayloadAction<NoteType>) {
        state.notes.push(action.payload);
      },
      updateNote(state, action: PayloadAction<NoteType>) {
        const noteIndex = state.notes.findIndex(note => note.id === action.payload.id);
        if (noteIndex !== -1) {
          const existingNote = state.notes[noteIndex];
          state.notes[noteIndex] = {
            ...existingNote,
            title: action.payload.title,
            text: action.payload.text,
            tagId: action.payload.tagId,
            updated: new Date().toISOString(),
          };
        }
      },
      deleteNote(state, action: PayloadAction<NoteType['id']>) {
        //тут было ниже в постах === action.payload.id
        const noteIndex = state.notes.findIndex(note => note.id === action.payload);
          if (noteIndex !== -1) {
            state.notes.splice(noteIndex, 1);
          }
      },
      selectNote(state, action: PayloadAction<NoteType | null>) {
        state.selectedNote = action.payload;
      },
    },
  })

  export default noteSlice;