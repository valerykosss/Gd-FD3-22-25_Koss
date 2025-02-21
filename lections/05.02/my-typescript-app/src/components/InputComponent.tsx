import { useEffect, useState } from "react";
// import { store } from "../store";
import { useDispatch } from "react-redux";

export default function InputComponent() {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fullName, setFullName] = useState('');

  //v if nelzja 
  //start with use

  //антипаттерн 
  useEffect(() => {
    console.log("#useEffect always")
  });

  //сработает только раз, используется только раз
  useEffect(() => {
    console.log("#useEffect render")
  }, []);

  // useEffect(() => {
  //   console.log("#useEffect name")
  // }, [name]);

  //ОШИБКА ИСПОЛЬЗОВАТЬ ТУТ ДВЕ ЗАВИСИМОСТИ, КОТОРЫЕ И ТАК ДРУГ ОТ ДРУГА ЗАВИСЯТ!!!!! lastName И fullName - рекурсия
  // useEffect(() => {
  //   const newFullName = name.trim() + ' ' + lastName.trim();
  //   setFullName(newFullName);
  // }, [name, lastName, fullName]);

  useEffect(() => {
    const newFullName = name.trim() + ' ' + lastName.trim();
    setFullName(newFullName);

    // // в redux
    // store.dispatch({type: 'input', name, lastName});

    //в react redux
    dispatch({type: 'input', name, lastName});
  }, [name, lastName, dispatch]);
  
   return <>
      <input onChange={(e) => setName(e.target.value)} />
      <input onChange={(e) => setLastName(e.target.value)} />
      {/* <div>Entered Text: {name} {lastName}</div> */}
      <div>Entered Text: {fullName}</div>
   </>
}