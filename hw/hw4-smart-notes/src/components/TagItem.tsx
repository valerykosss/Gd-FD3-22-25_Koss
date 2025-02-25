import React, { useState } from 'react';
import { TagType } from '../types/TagType'
import { useDispatch } from 'react-redux';
import { action, useTypedSelector } from '../store';
import Modal from "react-modal";

export type TagItemProps = TagType & {
  onEdit: (tag: TagType) => void;
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: "20px",
    width: "400px",
  },
};

export default function TagItem(props: TagItemProps){
  const dispatch = useDispatch();
  const notes = useTypedSelector(state => state.noteSlice.notes);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const hasNotes = notes.some(note => note.tagId === props.id);

  //проверить,есть ли заметки с таким тегом, если есть, не давать возможность удалять
  function handleDeleteTag() {
    dispatch(action.tagSlice.deleteTag(props.id));
    setIsModalOpen(false);
  };

  return (
    <div className="slice__list-item item">
      <div className="item__text">{props.name} ({props.count})</div>
      <div className="item__btns-wrapper">
        <button className="item__view-btn" onClick={() => props.onEdit(props)}>edit</button>
        {hasNotes ? null : (
          <button className="item__view-btn" onClick={() => setIsModalOpen(true)}>delete</button>
        )}
      </div>
      <Modal isOpen={isModalOpen} style={customStyles} onRequestClose={() => setIsModalOpen(false)}>
        <h2>Are you sure you want to delete this note?</h2>
        <button onClick={handleDeleteTag}>Yes, delete</button>
        <button onClick={() => setIsModalOpen(false)}>No, keep it</button>
      </Modal>
    </div>
  );
}