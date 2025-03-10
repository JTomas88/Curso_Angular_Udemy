export function whatsMyType<T>(argument: T): T {
  return argument;
}

let amIString = whatsMyType<string>('Hola Mundo');
let amINumber = whatsMyType<number>(100);
let amIArray = whatsMyType([1, 2, 3, 4, 5]);

console.log(amIString.split(''));
console.log(amINumber.toFixed(10));
console.log(amIArray.join('-'));
