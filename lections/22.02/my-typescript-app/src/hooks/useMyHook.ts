import { useState } from "react";

//custom hook 
export function useMyHook () {
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