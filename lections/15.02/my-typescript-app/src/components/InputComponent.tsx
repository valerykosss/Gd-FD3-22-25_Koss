import { useEffect, useState } from "react";
// import { store } from "../store";
import { useDispatch } from "react-redux";
import { action } from "../store";
import { useTypedSelector } from "../store";

export default function InputComponent() {
  const nameState = useTypedSelector((store) => store.nameSlice);

  console.log('#input component ', nameState);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fullName, setFullName] = useState('');

  //v if nelzja 
  //start with use
  //сработает только раз, используется только раз
  useEffect(() => {
    console.log("#useEffect render")
  }, []);

  useEffect(() => {
    const newFullName = name.trim() + ' ' + lastName.trim();
    setFullName(newFullName);

    dispatch(action.nameSlice.input({ name, lastName }));
  }, [name, lastName, dispatch]);
  
   return <>
      <input onChange={(e) => setName(e.target.value)} />
      <input onChange={(e) => setLastName(e.target.value)} />
      {/* <div>Entered Text: {name} {lastName}</div> */}
      <div>Entered Text: {fullName}</div>
   </>
}