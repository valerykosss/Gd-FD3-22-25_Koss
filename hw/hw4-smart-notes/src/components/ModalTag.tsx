import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { TagType } from "../types/TagType";
import { v4 as uuid} from "uuid";

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

type ModalTagProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (tag: Pick<TagType, 'name'>) => void;
  //для редактирования
  initialTag: TagType | null;
};

function ModalTag(props: ModalTagProps) {
  const [name, setName] = useState(props.initialTag?.name || "");

  useEffect(() => {
    setName(props.initialTag?.name || "");
  }, [props.initialTag]);

  function resetModal() {
    setName("");
  }

  function handleCloseAndReset() {
    resetModal();  
    props.onClose();
  }

  function handleSaveAndReset() {
    props.onSave({ name });
    resetModal();
    props.onClose();
  }

  const isSaveDisabled = !name.trim()

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.onClose}
      contentLabel="Tag Modal"
      style={customStyles}
    >
      <h2>{props.initialTag ? "Update a tag" : "Add a new tag"}</h2>
      <input
        className="modal__input"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Tag title"
      />
      <div className="modal__btns-wrapper">
        <button onClick={handleCloseAndReset}>Cancel</button>
        <button onClick={handleSaveAndReset} disabled={isSaveDisabled}>Save</button>
      </div>
    </Modal>
  );
}

export default ModalTag;