

const range = (low, high, filter) => 
    both(!high, lt(low,0))
    ? [] 
    : both(high, lt(high, low))
    ? [] 
    : both(high, filter)
    ? [...Array(sub(high,low))].map((x,i) => sum(i, low)).filter(isDivisible(filter)) 
    : both(high, gt(high, low))
    ? [...Array(sub(high, low))].map((x,i) => sum(i, low))
    : [...Array(low)].map((x,i) => i)

const compose = (fn, fn1) => arg => fn(fn1(arg))

//TODO enforce integer only
const mathOps = (operator) => (a, b) => eval('('+ a +')' + operator + '('+ b +')'),
      //arithmetic operators *  +  -   / %
      mul    = mathOps('*'), 
      sum    = mathOps('+'),
      sub    = mathOps('-'), 
      div    = (a,b) => both(neq(a,0),neq(b,0)) ? mathOps('/')(a,b) : NaN, 
      mod    = mathOps('%'),
      square = x => mul(x,x), 
      //boolean operators && || < > ===
      both   = mathOps('&&'), 
      either = mathOps('||'), 
      lt     = mathOps('<'), 
      gt     = mathOps('>'), 
      eq     = mathOps('==='),
      neq    = (a,b) => !eq(a,b),
      lte    = (a,b) => !gt(a,b), 
      gte    = (a,b) => !lt(a,b), 
      //bitwise operators << >> | & ^ 
      lbs    = mathOps('<<'), 
      rbs    = mathOps('>>'), 
      bor    = mathOps('|'), 
      xor    = mathOps('^'), 
      band   = mathOps('&'), 
      curMod = x => y => mod(y,x),
      curMul = x => y => mul(x,y)
      curEq  = x => y => eq(x,y)
      odd    = x => Boolean(band(x,1)), 
      even   = x => !odd(x),
      negate = x => (-x),
      equalsZero  = x => eq(0,x),
      isDivisible = x => compose(equalsZero, curMod(x))

const compare = fn => eq(2, fn.length) 
      ? (a,b) => fn(a,b) ? a : b 
      : 'cannot use function "compare" with curried function that takes less than 2 args',
      min = compare(lt),
      max = compare(gt)

//a reduce function similar to array.reduce
const curryReduce = mathfn => 
    function r(arr, total = arr.slice(0,1)[0]) { 
        return arr.length - 1
        ? r(arr.slice(1,arr.length), mathfn(total, arr.slice(1,2)[0])) 
        : total
    },
    reduceMul   = curryReduce(mul),
    reduceSum   = curryReduce(sum),
    reduceDiv   = curryReduce(div),
    notZeroAll = curryReduce(both)
