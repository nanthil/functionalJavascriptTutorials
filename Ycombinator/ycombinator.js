const yReduce = mathfn => fn => (arr, total = arr.shift()) => 
      arr.length 
      ? fn(arr, mathfn(total, arr.shift())) 
      : total,
      mulAll = yReduce(mul),
      sumAll = yReduce(sum)

const Y = fn => (x => x(x))(y => fn((...a) => y(y)(...a))),
      ySum = Y(sumAll),
      yMul = Y(mulAll)

const factorial = fn => n=> gt(n,1) ? mul(n, fn(sub(n,1))) : 1,
      yfact = Y(factorial)

console.log('Y Combinator Factorial: ' + yfact(5))
