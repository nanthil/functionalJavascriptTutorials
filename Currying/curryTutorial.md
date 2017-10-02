# Chapter 2: *Currying*
- Part 1: Stating the problem
- Part 2: Solving the problem
- Part 3: Implementing the Solution

## Part 1: *Stating the problem*

One day I was parousing a bit of code, and I came accross this:

**ex. 2-1**
```javascript
 function min(a,b) {
     return a < b ? a : b;
 }
 function max(a,b) {
/     return a > b ? a : b;
 }
 function eq(a,b) {
     return a === b;
 }
 function largest(a,b) {
     return a.x > b.x && a.y > b.y;
 }
 
```
You probably thought the same thing as I did: *"This looks like it violates the DRY(**Do not repeat yourself**) principle."* These *Functions* are practically identical, save for the arithmetic/boolean operators. They all perform some kind of operation on 2 values `a` and `b`, likely `numbers` or `integers`. 

Wouldn't it be nice if there were some way to define this redundant behavior *in one place*, by passing the `operator` to the *Function*? Something like:

**ex. 2-2**
```javascript
const compare = (operator, a,b) => a operator b
const min = compare(>,1,2) 
```

In other (*Purely Functional*) languages, this is possible. Some languages treat Mathematical symbols as *Functions* themselves, and not reserved characters or keywords. But sadly, in **Javascript** this is not possible. So the question is, *"Can we increase the readability, maintainability, and scalability of functions like min, max, eq, largest etc by defining this behavior once?"* A cursory google search returns results like the following:

**ex. 2-3**
```javascript
const mathFuncs = {
     '+': function (a,b) { return a + b },
     '-': function (a,b) { return a - b },
     '*': function (a,b) { return a * b },
     '/': function (a,b) { return a / b },
   '===': function (a,b) { return a === b },
     '<': function (a,b) { return a < b ? a : b },
     '>': function (a,b) { return a > b ? a : b },
   '>&&': function (a,b) { return a.x > b.x && a.y > b.y ? a : b}
}
mathFuncs['>'](5,3) //returns 5
mathFuncs['*'](5,3) //returns 15
```

But this doesn't look any better if we're trying to eliminate redundant defintions of equivalent code. I'm bascially copy pasting the same code over and over and over and over...

---

## Part 2: *Solving the problem*

This is where *Currying* comes in handy! You're reading a tutorial about *Currying*, so you probably expected we'd be using *Currying* at some point. We want to define the most abstract behavior of our math *Functions*. **a *some operator* b**, defining it only once. *Currying* is a fancy, elegant, and simple way of reducing redundant code by creating nested values and/or *Functions* that return a snapshot of the state of some *Function*.

> In other words, *Currying is a way to save the state of a *Function* before it is fully evaluated*

That sounds really *confusing,* how can you have a less than evaluated *Function*? *Functions* are evaluated when you call them right? 

The answer is, we already create partially evaluated functions all the time with hard coding! The following functions are fundamentally equivalent. `add5` is essentially creating a snapshot of `a + b` where `b === 5`

**ex. 2-4**
```javascript
const add = (a,b) => a + b,
      add5 = a    => a + 5
```

But hard coding doesn't give us any flexibility. Maybe we're adding other numbers constantly too! What if instead of `a => a + 5` we do:

**ex. 2-5**
```javascript
const add = (a,b) => a + b,
      add5 = a => add(a,5),
      add10 = a => add(a,10)

add5(1)//returns 6
add10(1)//returns 11 

//let's show our work!!!

//nothing happens yet. add5 is simply the expression:
// a => add(a,5)
const add5 = a => add(a,5)

add5(1) === (a => add(a,5))(1)
(a => add(a,5))(1)
(1 => add(1,5))[a:=1]
add(1,5)

add(1,5) === ((a,b) => a + b)(1,5)
((a,b) => a + b)(1,5)
((1,5) => 1 + 5)(a:= 1, b:= 5)
(1 + 5)
6
```
`add` is never evaluated until we pass an `a` to `add5`, thus add5 saves the state `add(someNumber, 5)` until we're ready with `someNumber`. We could further rewrite it as follows:

**ex. 2-6**
```javascript
const addN = a => b => a + b,
      add5 = addN(5)
      
add5(1)//returns 6


//let's show our work!!!
const add5 = addN(5) === (a => b => a + b)(5)
(a => b => a + b)(5)
(5 => b => a + b)(a:= 5)
(b => 5 + b)
add5 = b => 5 + b // We saw this in example 2-4!!!

add5(1) = (b => 5 + b)(1)
(b => 5 + b)(1)
(1 => 5 + 1)(b:=1)
(5 + 1)
6
```

---
## I Digress...

What about our nifty *DRY* math problem from *example 2-1*? We still want to pass operators to our *Functions*. To accomplish this we'll be using a little hack. **Javsacript** has this nifty little `eval` *Function* that tranlates a simple text string into executable code. ***I'm not suggesting this is a best practice by any stretch of the imagination***, but it will allow us to implement a simple and extensible example of *Currying*. We want to achieve the following by passing in any arithmetic operator as a string, and wihout repeating ourselves again.

**ex. 2-7**
```javascript
const mul = eval(a + '*' + b),
      sum = eval(a + '+' + b),
      sub = eval(a + '-' + b),
      div = eval(a + '/' + b)
```

Here we're building a string of `(a  operator  b)`. Can we create a *Function* to do this? A naive attempt might be:

**ex. 2-8**
```javascript
const mathOps(operator, a,b) => eval(a + operator + b)
const result = mathOps('*', 3, 4)// returns 12
```

But this creates a problem. Every time we want to multiply we need to pass `'*'`!!! That's inconvenient! We're a bunch of good lazy programmers who *Don't want to repeat ourselves!*

## Part 3: *Implementing the Solution*

Is there some way we can save a different version `mathOps` from *2-8*, one for each operator, and **WITHOUT REPEATING OURSELVES**? hmmm...

What if we return a *Function* from `mathOps, instead of the result of a calculation?

```javascript
//copy pasta this into your browsers console, or into a Javascript REPL online
const mathOps = (operator) => (a, b) => eval(a + operator + b),
      mul = mathOps('*')

mul(3,4)
```
This is *Currying*. Stated plainly, `mathOps` needs an `operator` to do anything, so we create a new *Function* called `mul` which passes `'*'` as the operator. `mul` is equal to the return value of `mathOps('*')`, which is itself a *Function*, so `mul` is a *Function* that takes `(a,b)`. 

*If you're still confused, that's normal.* **Let's show our work,** and try to follow along step by step

```javascript
// not real working code. for understanding purposes only


//we'll see that math ops returns a function
const mathOps = operator => (a, b) => eval(a + operator + b),
      mul = mathOps('*')

//FIRST ->
//lets reduce mul
//mul, mathOps('*') and operator... the following are all equivalent statements
mul === mathOps('*') 

mathOps('*') === operator => (a, b) => eval(a + operator + b)('*')

mul === operator => (a, b) => eval(a + operator + b)('*')



//Second -> 
//apply the argument
(operator) => (a, b) => eval(a + operator + b)('*')

//inject the argument and replace
'*' => (a, b) => eval(a + '*' + b)(operator:='*')

//final reduction
(a,b) => eval(a + '*' + b)

//mul takes 2 arguments, because it is a function
mul === (a,b) => eval(a + '*' + b)
```
`mathOps` takes 1 argument and returns a *Function*, and `mul` needs 2 arguments to return an evaluated string. 

```javascript
//Let's use our mul function
mul(3,4)

mul(3,4) === (a,b) => eval(a + '*' + b)(3,4)

//mul(3,4) === the following statment
(a,b) => eval(a + '*' + b)(3,4)

//apply values
(3,4) => eval(3 + '*' + 4)(a:= 3, b:= 4)

//execute eval
eval(3 + '*' + 4)
(3 * 4)

//result
12
mul(3,4) === 12
```

Congratulations, you've just *Curried* your first *Function*! Let's see what it looks like if we create functions for every operation in **Javascript**


```javascript
const mathOps = (operator) => (a, b) => eval(a + operator + b),
      mul    = mathOps('*'), //arithmetic operators *  +  -   / %
      sum    = mathOps('+'),
      sub    = mathOps('-'), 
      div    = mathOps('/'), 
      mod    = mathOps('%'),
      both   = mathOps('&&'), //boolean operators && || < > ===
      either = mathOps('||'), 
      lt     = mathOps('<'), 
      gt     = mathOps('>'), 
      lte    = (a,b) => !gt(a,b), 
      gte    = (a,b) => !lt(a,b), 
      eq     = mathOps('==='),
      lbs    = mathOps('<<'), //bitwise operators << >> | & ^ 
      rbs    = mathOps('>>'), 
      bor    = mathOps('|'), 
      xor    = mathOps('^'), 
      band   = mathOps('&'), 
```

This is so much easier to read and to understand than the example from the beginning of this chapter. One look at `mathOps` and you can reason about what `mul`, `sum`, etc are doing.And with `lte and gte` you can see that the're easily extended into other functions.

Let's create some helper functions with our new math functions
```javascript
const square = x => mul(x,x), //random math helpers to demonstrate usage
      odd    = x => Boolean(band(x,1)), //bitwise& odd check
      even   = x => !odd(x)

      even2  = x => eq(0, mod(x, 2)) //alternative defintions for demonstration
      odd2   = x => !even2(x)
      equalsZero = x => eq(x,0)
 ```

---

## Let's implement the examples from the top of the page

`compare` is another curried *Function*! `compare` takes a *Function*, in this case, a *Function* that returns a boolean. This looks like a job for lt and gt!!! 

```javascript
//We can create a helper to return largest or smallest of 2 numbers
//Look, compare is another curried function!!!
const compare = op => (a,b) => op(a,b) ? a : b,
      min = compare(lt)
      max = compare(gt)

//let's use our new functions!
min(0,5)//returns 0
max(7,77)//returns 77

//both is like a && b returns true if both are true
both(odd(5), even(6)) //returns true
//either is like a || b and returns true if either a or b is true
either(odd(4), even(4))
```

These seem like contrive examples. And that may be so, but *Currying* is a great tool when we don't know what we want to do, such as in the case of `Array.prototype.reduce()`. Let's create our own reduce and see how currying makes things a lot more readable. Here I've defined a standalone reduce function which takes a *Curried* `mathfn` function
```javascript
const curryReduce = mathfn => 
    function recursive(arr, total = arr.shift()) { 
        //named for recursive call function name cannot be referenced outside the function curryReduce
        return  arr.length ? recursive(arr, mathfn(total, arr.shift())) : total
    }


``` 
Ordinarily, we would have to define an inline *Anonymous Function* or *Lambda* to do the reducing for us. Using `Array.prototype.reduce`, it would look like the following:
```javascript
[1,2,3].reduce((a,b) => a + b)
```
But what if you wanted to do that all around your code? `(a,b) => a + b` would get really redundant after about the second time you use it. Isn't it convenient we already have a `sum` operation? Here with our custom `curryReduce` function we can create a function that sums an array every single time!
```javascript
const sumAll = curryReduce(sum)
sumAll([1,2,3]) + sumAll([4,5,6]) + sumAll([7,8,9])
```

Those are some pretty handy *Functions*. That's the power of *Currying*. You can save behavior for later. You don't have to *Curry* *Functions*. You can also *Curry* regular values. This is the sort of example you will see if you read other *Currying tutorials on the internet. 

```javascript
const add3 = x => sum(x, 3)
add3(4) //returns 7 

const add3ToAllAndReduce = arr => sumAll(arr.map(x => sum(x, 3)))
add3ToAll([1,2,3])
```

One last step on your road to currying is currying multiple values at the same time. As I mentioned in the introduction, *Real Function Composition* is a lot more elegant than simply passing *Functions* to a new *Function*. Instead, the value is that you can create a new behavior altogether. Instead of:

```javascript
const compose = (fn, fn1, arg) => fn(fn1(arg))
```
... we want to *Curry* `fn1` and `fn2` so that it creates an entirely new behavior.

```javascript
const compose = (fn, fn1) => arg => fn(fn1(arg))
const sumAll  = (curryReduce, sum)
sumAll([1,2,3])


//lets reimplement even2
const composeWithMultipleArgs = (fn, fn1) => args => fn(fn1(...args))
const equalsZero = x => eq(x,0)
const even2 = x=> compose(equalsZero, mod)([x,2])
```

Another example of *Currying 2 Functions* at the same time:
```javascript
const Vector2D = (x,y) => ({x:x, y:y}),

const Vector2dTransform = wrapperFn => op => (v1, v2) => wrapperFn(op(v1.x,v2.x), op(v1.y,v2.y)),

      ReturnVector2D = Vector2dTransform(Vector2D)//wrapperFn
      VectorAdd = ReturnVector2D(sum),
      VectorMul = ReturnVector2D(mul),
      VectorDiv = ReturnVector2D(div),

      BothVector2D = Vector2dTransform(both) //wrapperFn
      VectorMin = BothVector2D(lt),
      VectorMax = BothVector2D(gt),
      VectorEq  = BothVector2D(eq)


const compareVector2D = xform => (v1,v2) => xform(v1,v2) ? v1 : v2
      smallestVector2D = compareVector2D(VectorMin),
      largestVector2D  = compareVector2D(VectorMax)
```