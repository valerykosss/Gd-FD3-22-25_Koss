import React, { useState } from 'react';
import MyExampleComponent from '../components/MyExampleComponent'
import MyLink, { MyLinkProps } from '../components/MyLink';
import CounterComponent from '../components/CounterComponent'
import InputComponent from '../components/InputComponent'
import Canvas from '../components/Canvas'
import TextCanvas from '../components/TextCanvas';
import MyHello from '../components/MyHello';
import MyWrapper from '../components/MyWrapper';
import InputWithSave from '../components/InputWithSave';

// export type HomePageProps = {
//   setName?: (name: string) => void;
// }

// export default function HomePage(props: HomePageProps) {
export default function HomePage() {
  //типизация - массив объектов 
  const links: {label: string; url: string}[] = [
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
  url = {item.url}
  key={item.url}
  variant='outlined'>
    {item.label}
    </MyLink>))
  //

  //

  //чтобы получить имя из инпута в родительский элемент
  const [name, setName] = useState('')
  const [tab, setTab] = useState('one')

  //JSX
  return (
    <div className="HomePage">
      <div>
          TABS:
          <div onClick={() => setTab('one')}>TabOne</div>
          <div onClick={() => setTab('two')}>TabOne</div>
        </div>

        <div>
          {tab === 'one' &&  <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload. 
          {/* {name} */}
        </p>
        <MyWrapper>
          {/* <InputWithSave setName={props.setName} /> */}
          <InputWithSave />
        </MyWrapper>


        <Canvas></Canvas>

        <MyWrapper>
          <TextCanvas></TextCanvas>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero blanditiis unde quos minus? Reiciendis fugiat culpa doloribus pariatur. Nisi natus culpa tenetur amet necessitatibus cum quas qui, iusto odit cumque!</p>
        </MyWrapper>

        <MyWrapper>
          {myHelloVariable}
          {[myHelloVariable, myHelloVariable, myHelloVariable]}
          <MyHello />
          <MyHello></MyHello>
        </MyWrapper>

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

        <MyWrapper>
          {links.map((item, index) => (<MyLink   key={index}
          url={item.label}
          variant='outlined'>
            {item.label}
          </MyLink> ))}
          {myComponentLinks}
        </MyWrapper>

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
      </header>}
          {tab === 'two' ? <div>Some text for tab 2</div> : null }

        </div>
    </div>
  );
}
