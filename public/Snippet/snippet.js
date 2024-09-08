const firstArr = [5, 2, 1];
const secondArr = [1, 2, 3, 4, 5];

const diff = [
  ...secondArr.filter((x) => !firstArr.includes(x)),
  ...firstArr.filter((x) => !secondArr.includes(x)),
];
console.log("diff", diff); //[3,4]

function arrayDiff(a, b) {
  return [
    ...a.filter((x) => b.indexOf(x) === -1),
    ...b.filter((x) => a.indexOf(x) === -1),
  ];
}
console.log("arrayDiff", arrayDiff(firstArr, secondArr)); //[3,4]

const difference = (a, b) => {
  const setA = new Set(a);
  const setB = new Set(b);

  return [...a.filter((x) => !setB.has(x)), ...b.filter((x) => !setA.has(x))];
};

difference(firstArr, secondArr); //[3,4]
console.log("difference", difference(firstArr, secondArr));
