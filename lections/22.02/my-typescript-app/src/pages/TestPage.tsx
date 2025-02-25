import { useState } from "react";
import { read, insert, lockGet, update } from "../api/ajaxStringStorage2";
import InputWithSave from "../components/InputWithSave";
import MyWrapper from "../components/MyWrapper";
import Modal from 'react-modal';

// read().then(result => console.log('read', result));

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  Modal.setAppElement('#root');

export default function TestPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }
    
    // read
    // insert
    // lockGet
    // update

    return (<div className="content">
        <MyWrapper>
            <InputWithSave/>
        </MyWrapper>

        <button onClick={openModal}>Modal</button>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <div>
            <input placeholder="name" onChange={(e) => setName(e.target.value)}/>
            <br />
            <input placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
            <br />
            <input placeholder="value" onChange={(e) => setValue(e.target.value)}/>
            <br />
            <button onClick = {() => {read(name).then(setResult)}}>READ</button>
            <button onClick = {() => {insert(name, value).then(setResult)}}>INSERT</button>
            <button onClick = {() => {lockGet(name, password).then(setResult)}}>LOCKGET</button>
            <button onClick = {() => {update(name, password, value).then(setResult)}}>UPDATE</button>

            <br />
            {result}
        </div>
      </Modal>
    </div>);
}