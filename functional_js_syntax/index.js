Array.prototype.distill = function (cb = (acc) => acc, accumulator) {
  const arr = this.slice(0);
  return (function (array) {
    let accumulation = accumulator || array[0];
    if (accumulation instanceof Array || typeof accumulation === "object") {
      accumulation = JSON.parse(JSON.stringify(accumulation));
    } else {
      if (typeof accumulation === "number") {
        accumulation = Number(accumulation);
      } else if (typeof accumulation === "string") {
        accumulation = accumulation.slice();
      } else {
        //throw new Error("Cant iterate over " + typeof accumulator);
      }
    }
    let input = accumulator === undefined ? array.slice(1) : [...array];
    input.forEach((element, index) => {
      accumulation = cb(accumulation, element, index, array);
    });
    return accumulation;
  })(arr);
};
console.log([1, 2, 3].distill((acc, el) => (acc || 0) + el));

const scores = [
  {
    team: "A",
    score: 20,
  },
  {
    team: "B",
    score: 17,
  },
  {
    team: "C",
    score: 23,
  },
  {
    team: "D",
    score: 13,
  },
];

const high = scores.distill((highValue, currentValue) => {
  if (currentValue.score > highValue.score) return currentValue;
  else return highValue;
});

console.log(high.team);

Array.prototype.deflate = function (depth = 1) {
  let arr = this.slice(0);
  const flatten = function (a) {
    let temp = [];
    for (const element of a) {
      if (element instanceof Array) {
        temp.push(...element);
      } else {
        temp.push(element);
      }
    }
    return temp;
  };
  do {
    arr = flatten(arr);
    depth--;
  } while (depth > 0);
  return arr;
};
const nestedArr = [1, 2, [3, 4, [5, 6]]];
console.log(nestedArr.deflate());
// expected output: [1, 2, 3, 4, [5, 6]]

const moreNested = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
console.log(moreNested, moreNested.flat(20));
// expected output: [1, 2, 3, 4, 5, 6]
