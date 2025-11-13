function sum(x = 0) {
  let sum = x;

  function insideSum(y) {
    if (arguments.length === 0 || y === undefined) {
      return sum;
    }

    sum += y;
    return insideSum;
  }

  return insideSum;
}

const result = sum(2)(3)(5)(7);
console.log(result());
