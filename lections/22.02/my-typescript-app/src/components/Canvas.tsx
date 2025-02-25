import { useContext } from "react";
import { useMyHook } from "../hooks/useMyHook";
import { useNameContext } from "../contexts/nameContext";

export default function Canvas() {
  // const [coordinates, setCoordinates] = useState({x: NaN, y: NaN});

  // const tracking = (x: number, y: number) => {
  //   setCoordinates( {x, y} )
  // }

  const myHook = useMyHook();
  const { name } = useNameContext();

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

    <div>X: {myHook.x} | Y: {myHook.y} ({name})</div>
  </>
}