export const helloworld = () => {
  console.log("Hello World!");
}

export const largeNumberAdd = (a, b) => {
  let ans = '';
  let ai = a.length - 1;
  let bi = b.length - 1;
  let carry = 0;
  while (ai >= 0 || bi >= 0) {
    let curA = 0;
    let curB = 0;
    if (ai >= 0) {
      curA = a[ai] - '0';
      ai -= 1;
    }
    if (bi >= 0) {
      curB = b[bi] - '0';
      bi -= 1;
    }

    let sum = curA + curB + carry;
    carry = 0;
    if (sum >= 10) {
      carry = 1;
      sum %= 10;
    }

    ans = sum.toString() + ans;
  }

  if (carry > 0) {
    ans = carry.toString() + ans;
  }
  return ans;
};


export default {
  largeNumberAdd,
  helloworld
}