import { useState } from "react";

//void указывает на пустоту значения возвращаемого
export type SetStateNumberType = (arg1: number) => void;
export type UseCountWithLimitReturn = [number, SetStateNumberType];

export function useCountWithLimit(limit: number) : UseCountWithLimitReturn {
  const [count, setCount] = useState(0);

  let value = count;
  if (count > limit) {
    value = limit;
  }

  return [value, setCount];
}