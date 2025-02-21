import { useMyHook } from "../hooks/useMyHook";

export default function TextCanvas() {
  const myHook = useMyHook();

  return <>
    <div>x: <input type="number" onChange={ event => myHook.tracking(event.target.valueAsNumber, null )} /></div>
    <div>y: <input type="number" onChange={ event => myHook.tracking(null, event.target.valueAsNumber)} /></div>
    <div>X: {myHook.x} | Y: {myHook.y}</div>

  </>
}
