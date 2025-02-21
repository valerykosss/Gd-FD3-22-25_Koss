import React from 'react';
import './App.css';

const MyExampleComponent: React.FC<{}> = (props) => {
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

      </header>
    </div>
  );
}

export default App;
