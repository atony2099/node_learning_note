function a(f) {
  console.log("===aa", f);
}

function q(f) {
  console.log("===qqq");
}

function b(f) {
  console.log("b===", f);
  return "a";
}

[a, b, q].reduceRight((compose, f) => f(compose));

// [1, 4, 3].reduce((total, cuur) => {
//   console.log(total, cuur, "----");

//   return total + cuur;
// });
