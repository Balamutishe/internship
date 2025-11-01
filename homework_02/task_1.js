function var1(x = 0) {
  return (y) => {
    if (!y) return x;

    return (z) => {
      if (!z) return x + y;

      return x + y + z;
    };
  };
}

const var2 = x => y => z => x + y + z;

const result1 = var1(2)(3)(5);
const result2 = var2(2)(3)(5);
