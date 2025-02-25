import React, { useEffect, useState } from 'react';
import NoteItem from './NoteItem';
import { NoteType } from '../types/NoteType';
import { TagType } from '../types/TagType';
import { loadNotesFromLocalStorage, saveNotesToLocalStorage } from '../helpers/localStorageHelper';
import { useDispatch } from 'react-redux';
import { action, useTypedSelector } from '../store';
import ModalNote from './ModalNote';
import { v4 as uuid} from "uuid";

export const defaultNotes: NoteType[] = [
  {
    id: '1',
    tagId: 'tag1Id',
    title: 'Note title 1',
    text: 'Note text 1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae temporibus cupiditate ab dicta ea aspernatur totam ad et excepturi nihil nesciunt distinctio alias, eligendi saepe ipsum earum! Ullam, asperiores saepe.',
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
  },
  {
    id: '2',
    tagId: 'tag2Id',
    title: 'Note title 2',
    text: 'Note text 2. Lorem ipsum dolor sit amet consectetur.',
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
  },
  {
    id: '3',
    tagId: 'tag2Id',
    title: 'Note title 3',
    text: 'Note text 3. Lorem ipsum dolor sit amet consectetur. Repudiandae temporibus cupiditate ab dicta ea aspernatur totam.',
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
  },
];

export default function Notes() {
  const dispatch = useDispatch();
  const notes = useTypedSelector((state) => state.noteSlice.notes);
  const tags = useTypedSelector((state) => state.tagSlice.tags);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<NoteType | null>(null);

  //filter
  const [searchText, setSearchText] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

  useEffect(() => {
    const savedNotes = loadNotesFromLocalStorage();

    if (savedNotes.length > 0) {
      dispatch(action.noteSlice.init(savedNotes));
    } else {
      dispatch(action.noteSlice.init(defaultNotes));
      saveNotesToLocalStorage(defaultNotes);
    }
  }, []);

  useEffect(() => {
    saveNotesToLocalStorage(notes);
  }, [notes]);

  function handleAddNote() {
    setSelectedNote(null);
    setIsModalOpen(true);
  }

  function handleEditNote(note: NoteType) {
    setSelectedNote(note);
    setIsModalOpen(true);
  }

  function handleSaveNote(note: Omit<NoteType, 'id' | 'created' | 'updated'>) {
    //save for update
    if (selectedNote) {
      dispatch(action.noteSlice.updateNote({ ...selectedNote, ...note, updated: new Date().toISOString() }));
    } else {
      dispatch(action.noteSlice.addNote({ id: uuid(), ...note, created: new Date().toISOString(), updated: new Date().toISOString() }));
    }
    setIsModalOpen(false);
  }

  function filterNotes(notes: NoteType[], text: string, tag: string) {
    return notes.filter((note: NoteType) => 
      (note.title?.toLowerCase().includes(text.toLowerCase()) || 
       note.text.toLowerCase().includes(text.toLowerCase())) && 
      (tag === "All" || note.tagId === tag)
    );
  }

  const filteredNotes = filterNotes(notes, searchText, selectedTag);

  return (
    <div className="slice__wrapper">
      <div className="slice__title-add-wrapper">
        <div className="slice__title">Notes ({filteredNotes.length})</div>
        <button className="slice__add-btn" onClick={handleAddNote}>+</button>
      </div>

      <div className="slice__filters-wrapper">
        <input 
          className="slice__search" 
          type="text" 
          placeholder="Search by keyword"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)} />
        <select 
          className="slice__dropdown" 
          name="tags"
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}>

        <option value="All" selected>All</option>
          {tags.map((tag: TagType) => (
            <option key={tag.id} value={tag.id}>
              {tag.name}
            </option>
          ))}
        </select>
      </div>

      <div className="slice__list-wrapper note">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <NoteItem
              onEdit={handleEditNote}
              tags={tags}
              key={note.id}
              id={note.id}
              tagId={note.tagId}
              title={note.title}
              text={note.text}
              created={note.created}
              updated={note.updated}
            />
          ))
        ) : (
          <p>No notes found</p>
        )}
      </div>

      <ModalNote
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveNote}
        initialNote={selectedNote || null}
        tags={tags}
      />

    </div>
  );
}