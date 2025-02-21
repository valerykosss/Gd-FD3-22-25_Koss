function one() {
    return null;
}

const q1 = null;
const q2 = undefined;
const q3 = 10; // number
const q4 = ''; // string
const q5 = true; // boolean (true) (false)
const q6 = {};
const q7 = [1]; // number[], Array<number>

type TypeOne = {
    key1: number;
    key2: string;
}

type TypeTwo = number | string; // number or string

interface IOne {
    key1: number;
    key2: string;
    key3: TypeTwo;
}

let q8: TypeOne;
//q8.key1;

function two(arg1: TypeOne, arg2: TypeTwo) {
    return arg1.key1 + Number(arg2); // явно преобразовали тип 
}

type TypeThree = {
    key1: number[];
    key2: string[];
    key3: TypeTwo[]; //массив чисел или строк, но может быть и вперемешку числа и строки 
    key4: (number | string)[]; // тип для одного элемента массива
    key5: number[] | string[]; // тип для всего массива
}