import { useEffect, useState } from "react";

export default function InputComponent() {
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
  }, [name, lastName]);
  
   return <>
      <input onChange={(e) => setName(e.target.value)} />
      {/* <div>Entered Text: {name} {lastName}</div> */}
      <div>Entered Text: {fullName}</div>
   </>
}