const str = 'one.two.three.four.five';
const strArr = str.split(".");

function createObjFromArr1(arr) {
  const obj = {};
  let deepObj = obj;

  // for (let i = 0; i <= arr.length; i++) {
  //   deepObj[arr[i]] = {};
  //   deepObj = deepObj[arr[i]];
  // }

  arr.forEach((item) => {
    deepObj[item] = {};
    deepObj = deepObj[item];
  });

  return obj;
}

function createObjFromArr2(arr) {
  return arr.reduceRight((acc, current) => ({[current]: acc}));
}

// до этого варианта не сам допер но мне понравилась идея
function createObjFromArr3(arr) {
  if (arr.length === 0) {
    return {};
  }

  const [head, ...rest] = arr;
  return { [head]: createObjFromArr3(rest) };
}

const result= createObjFromArr1(strArr);
console.log(result)
