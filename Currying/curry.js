const compose = (fn, fn1) => arg => fn(fn1(arg))
//string parens are used to preserve sign of negative numbers
const mathOps = (operator) => (a, b) => eval('('+ a +')' + operator + '('+ b +')'),
      mul    = mathOps('*'), //arithmetic operators *  +  -   / %
      sum    = mathOps('+'),
      sub    = mathOps('-'), 
      div    = mathOps('/'), 
      mod    = mathOps('%'),
      square = x => mul(x,x), //random math helpers to demonstrate usage
      both   = mathOps('&&'), //boolean operators && || < > ===
      either = mathOps('||'), 
      lt     = mathOps('<'), 
      gt     = mathOps('>'), 
      eq     = mathOps('==='),
      lte    = (a,b) => !gt(a,b), 
      gte    = (a,b) => !lt(a,b), 
      lbs    = mathOps('<<'), //bitwise operators << >> | & ^ 
      rbs    = mathOps('>>'), 
      bor    = mathOps('|'), 
      xor    = mathOps('^'), 
      band   = mathOps('&'), 
      curMod =  a => b => mod(b,a), //curried version of functions
      curMul =  a => b => mul(b,a), //curried version of functions
      curEq  = a => b => mathOps('===')(a,b),
      odd    = x => Boolean(band(x,1)), //bitwise& odd check
      even   = x => !odd(x),
      negate = x => (-x),

    //alternatively
      equalsZero  = x => eq(0,x),
      isDivisible = x => compose(equalsZero, curMod(x)),
      even2       = isDivisible(2),
      odd2        = x => !even2(x)

//fn should return a boolean, or a truthy/falsy value
const compare = fn => (a,b) => fn(a,b) ? a : b,
      min = compare(lt),
      max = compare(gt)

//a reduce function similar to array.reduce
const curryReduce = mathfn => 
    function r(arr, total = arr.shift()) { 
        return arr.length 
        ? r(arr, mathfn(total, arr.shift())) 
        : total
    },
    curryMul   = curryReduce(mul),
    currySum   = curryReduce(sum),
    notZeroAll = curryReduce(both),
    curryDiv = arr => notZeroAll(arr.slice(0))//creates a copy of x
                    ? curryReduce(div)(arr) 
                    : 'error, division by zero' 
