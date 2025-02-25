import React, { useState } from 'react';
import { NoteType } from '../types/NoteType'
import { TagType } from '../types/TagType'
import { useDispatch } from 'react-redux';
import Modal from "react-modal";
import { action } from '../store';

//для расширения типа, чтобы вывести названия тегов и 
type NoteItemProps = NoteType & {
  tags: TagType[];
  onEdit: (note: NoteType) => void;
};

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

export default function NoteItem(props: NoteItemProps) {
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tag = props.tags.find(tag => tag.id === props.tagId);

  const createdDate = new Date(props.created);
  const updatedDate = new Date(props.updated);

  const shouldShowViewButton = props.text.length > 90;
  const displayedText = isExpanded ? props.text : props.text.slice(0, 90) + (shouldShowViewButton ? '<b><i>...(click view to read the full text)</i></b>' : '');

  function handleDeleteNote () {
    dispatch(action.noteSlice.deleteNote(props.id));
  };
  
  return (
    <div className="slice__list-item item">
      <div className="item__title">{props.title}</div>
      <div className="item__tag">{tag ? tag.name : ''}</div>
      <div className="item__text" dangerouslySetInnerHTML={{ __html: displayedText }}></div>
      <div className="item__date">{
        createdDate.getTime() === updatedDate.getTime() 
        ? createdDate.toISOString() 
        : `${updatedDate.toISOString()} (updated)`}
      </div>
      <div className="item__btns-wrapper">
        {shouldShowViewButton ? (
          <button className="item__view-btn" onClick={() => setIsExpanded(prev => !prev)}>
            {isExpanded ? 'hide' : 'view'}
          </button>
        ) : null}
        <button className="item__edit-btn" onClick={() => props.onEdit(props)}>edit</button>
        <button className="item__delete-btn" onClick={() => setIsModalOpen(true)}>delete</button>
      </div>

      <Modal isOpen={isModalOpen} style={customStyles} onRequestClose={() => setIsModalOpen(false)}>
        <h2>Are you sure you want to delete this note?</h2>
        <button onClick={handleDeleteNote}>Yes, delete</button>
        <button onClick={() => setIsModalOpen(false)}>No, keep it</button>
      </Modal>

    </div>
    
  );
}

