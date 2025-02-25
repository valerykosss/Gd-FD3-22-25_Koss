import React, { useEffect, useState } from 'react';
import TagItem from './TagItem';
import { TagType } from '../types/TagType';
import { NoteType } from '../types/NoteType';
import { defaultNotes } from './Notes';
import { loadTagsFromLocalStorage, saveTagsToLocalStorage } from '../helpers/localStorageHelper';
import { useDispatch } from 'react-redux';
import { action, useTypedSelector } from '../store';
import { v4 as uuid} from "uuid";
import ModalTag from './ModalTag';

export const defaultTags: TagType[] = [
  { id: 'tag1Id', name: 'Personal', count: 0 },
  { id: 'tag2Id', name: 'Ads', count: 0 },
  { id: 'tag3Id', name: 'Work', count: 0 },
];

export default function Tags() {
  const dispatch = useDispatch();
  const notes = useTypedSelector((state) => state.noteSlice.notes);
  const tags = useTypedSelector((state) => state.tagSlice.tags);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<TagType | null>(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const savedTags = loadTagsFromLocalStorage();
    if (savedTags.length > 0) {
      dispatch(action.tagSlice.init(savedTags));
    } else {
      dispatch(action.tagSlice.init(defaultTags));
    }
  }, []);

  function getTagCount(tagId: TagType['id']) {
    return notes.filter((note) => note.tagId === tagId).length;
  }

  const updatedTags = tags.map((tag) => {
    const count = getTagCount(tag.id);
    return { ...tag, count };
  });

  useEffect(() => {
    saveTagsToLocalStorage(updatedTags);
  }, [updatedTags]);

  const filteredTags = updatedTags.filter(tag => 
    tag.name.toLowerCase().includes(searchText.toLowerCase())
  );

  function handleAddTag() {
    setSelectedTag(null);
    setIsModalOpen(true);
  }

  function handleEditTag(tag: TagType) {
    setSelectedTag(tag);
    setIsModalOpen(true);
  }

  function handleSaveNote(tag: Pick<TagType, 'name'>) {
    //save for update
    if (selectedTag) {
      dispatch(action.tagSlice.updateTag({ ...selectedTag, ...tag}));
    } else {
      dispatch(action.tagSlice.addTag({ id: uuid(), ...tag, count: 0 }));
    }
    setIsModalOpen(false);
  }


  return (
    <div className="slice__wrapper">
      <div className="slice__title-add-wrapper">
        <div className="slice__title">Tags ({filteredTags.length})</div>
        <button className="slice__add-btn" onClick={handleAddTag}>+</button>
      </div>

      <input 
        className="slice__search" 
        type="text" 
        placeholder="Search by keyword"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)} />

      <div className="slice__list-wrapper tag">
        {filteredTags.length > 0 ? (
          filteredTags.map(tag => (
            <TagItem
              onEdit={handleEditTag}
              key={tag.id}
              id={tag.id}
              name={tag.name}
              count={tag.count}
            />
          ))
        ) : (
          <p>No tags found</p> 
        )}
      </div>

      <ModalTag
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveNote}
        initialTag={selectedTag || null}
      />
    </div>
  );
}