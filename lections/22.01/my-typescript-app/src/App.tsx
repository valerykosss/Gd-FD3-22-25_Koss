import React, { useEffect, useState } from 'react';
import './App.css';

//const MyExampleComponent: React.FC<{}> = (props: any) => {
const MyExampleComponent = (props: any) => {
  // JSX
  console.log('#MyExampleComponent', props);
  return null;
}

const MyHello = () => <p>Hello, My Component</p>;

type MyLinkProps = {
  label: string;
  url: string;
}

//props - объект с аттрбутами
function MyLink(props: MyLinkProps) {
  console.log('#MyLink', props);

  return (
  <a
    className="App-link"
    href= {props.url}
    target="_blank"
    rel="noopener noreferrer"
  >
  {props.label}
</a>);
}

//   function CounterComponent() {
//     let count = 0;
//     return <button 
//       onClick={() => alert('Alert is working')}>
//         Alert
//       </button>
// }

function useCountWithLimit(limit: number) {
  const [count, setCount] = useState(0);

  let value = count;
  if (count > limit) {
    value = limit;
  }

  return {value, setCount};
}

//второй вариант 
function CounterComponent() {
  //count - текущий счетчик 
  //setCount - функция
  //0 в useState это начальное значение
  // начинается со слова use
  //2) хуки нельзя использовать вне компонента, только внутри комонента
  //3) хуки нельзя положить внутрь условного оператора
  //4) хуки можно писать внутри других функций-хуков?
  // setCount не работает мгновенно

  //хуки начинаются с ключевого слова use
  const {value: count1, setCount: setCount1} = useCountWithLimit(100);
  const {value: count2, setCount: setCount2} = useCountWithLimit(100);

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

function InputComponent() {
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

//custom hook 
function useMyHook () {
  const [coordinates, setCoordinates] = useState({x: NaN, y: NaN});

  const tracking = (x: number | null, y: number | null) => {
    if (x === null && y === null) {
      return;
    }

    if (x === null) {
      setCoordinates( {...coordinates, y: Number(y)} );
      return;
    }

    if (y === null) {
      setCoordinates( {...coordinates, x: Number(x)} );
      return;
    }

    setCoordinates( {x: Number(x), y: Number(y)} );
  }

  const leave = () => {
    setCoordinates( {x: NaN, y: NaN} )
  }

  //каждый раз проверяется при дрыгании мышкой
  const isInbound = !isNaN(coordinates.x) && !isNaN(coordinates.y);

  return {
    coordinates,
    // setCoordinates,
    x: coordinates.x,
    y: coordinates.y,
    tracking,
    isInbound,
    leave
  }
}

function Canvas() {
  // const [coordinates, setCoordinates] = useState({x: NaN, y: NaN});

  // const tracking = (x: number, y: number) => {
  //   setCoordinates( {x, y} )
  // }

  const myHook = useMyHook();

  let color : string;

  // //каждый раз проверяется при дрыгании мышкой
  // const isInbound = !isNaN(coordinates.x) && !isNaN(coordinates.y);

  //тут как раз цвета зависят от переменной, которая каждый раз изменяется
  if(myHook.isInbound) {
    if(myHook.x + myHook.y < 400) {
      color = "green"
    } else {
      color = "red"
    }
  } else {
    color = "silver"
  }

  return <>
    <div 
    style= {{
      width: "200px",
      height: "200px",
      backgroundColor: color 
    }}
      className="my-canvas" 
      onMouseEnter={(event) => myHook.tracking(event.clientX, event.clientY)}
      onMouseLeave={() => myHook.leave()}
      onMouseMove={(event) => myHook.tracking(event.clientX, event.clientY)}
    />

    <div>X: {myHook.x} | Y: {myHook.y}</div>
  </>
}

function TextCanvas() {
  const myHook = useMyHook();

  return <>
    <div>x: <input type="number" onChange={ event => myHook.tracking(event.target.valueAsNumber, null )} /></div>
    <div>y: <input type="number" onChange={ event => myHook.tracking(null, event.target.valueAsNumber)} /></div>
    <div>X: {myHook.x} | Y: {myHook.y}</div>

  </>
}

function App() {
  // JSX, тут можно встраивать переменные 
  const links: MyLinkProps[] = [
    {
      label: "Some Label",
      url: "https://reactjs.org"
    },
    {
      label: "Another Label",
      url: "https://google.com"
    },

    {
      label: "Yandex Label",
      url: "https://yandex.ru"
    }

  ];

  // 
  const myHelloVariable = <MyHello></MyHello>;

    // const myComponentLinks = links.map(item => {<MyLink 
    //   label = {item.label}
    //   url = {item.url}
    // />})


  // why () instead of {}
  const myComponentLinks = links.map(item => (<MyLink 
    label = {item.label}
    url = {item.url}
  />))
  //

  //

  //JSX
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Canvas></Canvas>
        <TextCanvas></TextCanvas>
        {myHelloVariable}
        {[myHelloVariable, myHelloVariable, myHelloVariable]}
        <MyHello />
        <MyHello></MyHello>

        {/* { links.map(item => <MyLink
          label = {item.label}
          url = {item.url}
        />)} */}
        {/* <MyLink 
          label="Some Label" 
          url="https://reactjs.org"/>
        <MyLink 
          label="Another Label" 
          url="https://google.com"/> */}

        {links.map((item, index) => (<MyLink 
          key={index}
          label = {item.label}
          url = {item.url}
        />))}
        
        {myComponentLinks}
        <MyExampleComponent 
          argNull = {null}
          argUndefined = {undefined}
          argBoolean = {true}
          argNumber = {101}
          argArray = {['some', 'array']}
          data = {{
            argNull: null,
            argUndefined: undefined,
            argBoolean: true,
            argNumber: 101,
            argArray: ['some', 'array']
          }}/>
        <CounterComponent></CounterComponent>
        <InputComponent></InputComponent>
      </header>
    </div>
  );
}

export default App;
