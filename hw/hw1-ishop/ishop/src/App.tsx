import React from 'react';
import './App.css';

const shopName: string = "Магазин музыкальных альбомов"

type ItemProps = {
  name: string;
  singer: string | string[];
  price: number;
  url: string;
  amountInStock: number | string;
}

const items: ItemProps[] = [
  {
    name: "Bangers",
    singer: "Miley Cyrus",
    price: 30,
    url: "https://via.assets.so/album.png?id=1&q=95&w=200&h=200&fit=fill",
    amountInStock: 3
  },
  {
    name: "Bentley",
    singer: "Kanye West",
    price: 40,
    url: "https://via.assets.so/album.png?id=2&q=95&w=200&h=200&fit=fill",
    amountInStock: 5
  },
  {
    name: "No name",
    singer: ["Rihanna", "Kanye West"],
    price: 50,
    url: "https://via.assets.so/album.png?id=3&q=95&w=200&h=200&fit=fill",
    amountInStock: 10
  },
  {
    name: "Swagga like us",
    singer: "Jay-z",
    price: 70,
    url: "https://via.assets.so/album.png?id=4&q=95&w=200&h=200&fit=fill",
    amountInStock: "нет в наличии"
  },

];


//props - объект с аттрибутами name, url...
//props = {name:'...', url:'...',}
function Item(props: ItemProps) {
  console.log('#Item', props);

  const amountInStockText = typeof props.amountInStock === 'number' ? 
  `${props.amountInStock} шт.`
  : props.amountInStock;



  return (<tr>
    <td><img src={props.url} /></td>
    <td>{Array.isArray(props.singer) ? props.singer.join(', ') : props.singer}</td>
    <td>{props.name}</td>
    <td>{props.price}$</td>
    <td>{amountInStockText}</td>
  </tr>
  );
}

function ItemsTable(props: { itemsProp: ItemProps[], shopName: string}) {
  //объект props c ключом itemsProp и с его значениями items(массивы)
  console.log(props);
  return (
    <>
      <h3>{props.shopName}</h3>
      <table>
          <thead>
            <tr>
              <th>Обложка альбома</th>
              <th>Исполнитель</th>
              <th>Названание альбома</th>
              <th>Цена</th>
              <th>В наличии</th>
            </tr>
        </thead>
        <tbody>
          {props.itemsProp.map(item => (
            //почему нельзя <Item></Item>, пишет про children; тут добавить key надо 
            <Item
            key = {item.name}
            {...item}
            // url= {item.url}
            // singer = {item.singer}
            // name = {item.name}
            // price = {item.price}
            // amountInStock={item.amountInStock}
          />))}
        </tbody>
      </table>
    </>
  );
}

function App() {
  return (
    <div className="App">
      {/* тут создается объект props c ключом itemsProp, который в свою очередь уже содержит массив items */}
      <ItemsTable shopName={shopName} itemsProp ={items} />
    </div>
  );
}

export default App;

//если писать {...items}, React попытается развёрнуть массив items как объект, где каждый элемент массива будет собственным свойством (ключом) в пропсах компонента.


/* Когда пытаешься развернуть массив с помощью {...}, это приводит к тому, что элементы массива будут присвоены значениям ключей в объекте, где ключи — это индексы массива. 
на простом примере:
const numbers = [1, 2, 3, 4]; 
<Component {...numbers} />

Результат: объект
{
  0: 1,
  1: 2,
  2: 3,
  3: 4
}
  
аналогично с items, если писать <ItemsTable {...items} />
{
  0: { name: "Bangers", singer: "Miley Cyrus", price: 30, ... },
  1: { name: "Bentley", singer: "Kanye West", price: 40, ... },
  2: { name: "No name", singer: ["Rihanna", "Kanye West"], price: 50, ... }
}
*/

