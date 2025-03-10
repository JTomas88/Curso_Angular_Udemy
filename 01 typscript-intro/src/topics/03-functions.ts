//Forma básica de definir una función:
// function addNumber(a: number, b: number) {
//   return a + b;
// }

// const result = addNumber(1, 2);
// console.log(result);

//Definición de una función de flecha.
// const addNumberArrow = (a: number, b: number): string => {
//   return `${a + b}`;
// };

// const result2: string = addNumberArrow(1, 3);
// console.log(result2);

function multiply(
  firstNumber: number,
  secondNumber?: number,
  base: number = 2
) {
  return firstNumber * base;
}
// const multiplyResult: number = multiply(5);
// console.log(multiplyResult);

interface Character {
  name: string;
  hp: number;
  showHp: () => void;
}

const healCharacter = (character: Character, amount: number) => {
  character.hp += amount;
};

const strider: Character = {
  name: 'Strider',
  hp: 50,
  showHp() {
    console.log(`Puntos de vida ${this.hp}`);
  },
};

healCharacter(strider, 10); // Imprime Puntos de vida 60
strider.showHp(); // Imprime puntos de vida 50

export {};
