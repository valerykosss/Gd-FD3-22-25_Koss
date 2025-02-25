import { useState } from 'react';
import { useCountWithLimit } from '../hooks/useCountWithLimit'

//   function CounterComponent() {
//     let count = 0;
//     return <button 
//       onClick={() => alert('Alert is working')}>
//         Alert
//       </button>
// }

//второй вариант 
export default function CounterComponent() {
  //count - текущий счетчик 
  //setCount - функция
  //0 в useState это начальное значение
  // начинается со слова use
  //2) хуки нельзя использовать вне компонента, только внутри комонента
  //3) хуки нельзя положить внутрь условного оператора
  //4) хуки можно писать внутри других функций-хуков?
  // setCount не работает мгновенно

  //хуки начинаются с ключевого слова use
  const [count1, setCount1] = useCountWithLimit(100);
  const [count2, setCount2] = useCountWithLimit(100);

  const [] = useState({count1 : 0, count2: 0})

const handler1 = () => {
  const newCount = count1 + 1; 
  setCount1(newCount);
  setCount2(count2 + 1);
}

const handler2 = () => {
  setCount1(count1 * 2);
  setCount2(count2 * 3);
}

const handlerClear = () => {
  setCount1(0);
  setCount2(0);
}

const handlerSwap = () => {
  setCount1(count2);
  setCount2(count1);
}


  // let count = 0;

  // const handler = () => {
  //   alert('Alert is working')
  //   count+=1;
  // }
  //   return <button 
  //     onClick={handler}>
  //       Counter : {count}
  //     </button>

  //<> - фрагмент, через <React.Fragment>
      return <>
        <button 
        onClick={handler1}>
          Counter1 : {count1}
        </button>

        <button 
        onClick={handler2}>
          Counte2 : {count2}
        </button>

        <button 
        onClick={handlerClear}>
          Clear
        </button>

        <button 
        onClick={handlerSwap}>
          Swap
        </button>
      </>
}