import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { NoteType } from "../types/NoteType";
import { TagType } from "../types/TagType";

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

type ModalNoteProps = {
  isOpen: boolean;
  onClose: () => void;
  //только tagId, title, text для сохранения
  onSave: (note: Omit<NoteType, "id" | "created" | "updated">) => void;
  initialNote: NoteType | null;
  //теги для выбора 
  tags: TagType[];
};

function ModalNote(props: ModalNoteProps) {
  const [title, setTitle] = useState(props.initialNote?.title || "");
  const [text, setText] = useState(props.initialNote?.text || "");
  const [tagId, setTagId] = useState(props.initialNote?.tagId || null);

  useEffect(() => {
    setTitle(props.initialNote?.title || "");
    setText(props.initialNote?.text || "");
    setTagId(props.initialNote?.tagId || null);
  }, [props.initialNote]);

  function resetModal() {
    setTitle("");
    setText("");
    setTagId(null);
  }

  function handleCloseAndReset() {
    resetModal();  
    props.onClose();
  }

  function handleSaveAndReset() {
    props.onSave({ title, text, tagId });
    resetModal();
    props.onClose();
  }

  const isSaveDisabled = !title.trim() || !text.trim();

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.onClose}
      style={customStyles}
    >
      <h2>{props.initialNote ? "Update a note" : "Add a new note"}</h2>

      <div className="modal__wrapper">
        <select className="modal__dropdown"
          value={tagId || ""}
          onChange={(e) => setTagId(e.target.value || null)}
        >
          <option value="" disabled>Select a tag</option>
          {props.tags.map((tag) => (
            <option key={tag.id} value={tag.id}>
              {tag.name}
            </option>
          ))}
        </select>

        <input 
          className="modal__input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
        />

        <textarea
          className="modal__textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Note text"
          rows={4}
        />
      </div>
      
      <div className="modal__btns-wrapper">
        <button onClick={handleCloseAndReset}>Cancel</button>
        {/* тут просто собираются данные и потом передаются в notes.tsx и там уже идет диспатч  */}
        <button onClick={handleSaveAndReset} disabled={isSaveDisabled}>Save</button>
      </div>
    </Modal>
  );
}

export default ModalNote;