# Chapter 3: Y Combinator
- Part 1: *What Combinator* - Defining the Y Combinator
- Part 2: *Why Combinator?* - The purpose of the Y Combinator, and why you should learn it
- Part 3: *How Combinator?* - Step-by-step explanation of the Y Combinator
- Part 4: *Reduce Combinator* - How to apply the Y Combinator to your own functions

## Part 1: *What Combinator*
In order to use the *Y Combinator*, you must first understand *Currying*. Without *Currying*, the **Javascript** snippet below will make ***even less*** sense than usual. I recommend revisiting the *Currying* chapter, and playing with some of the code snippets to really understand *Currying* before moving forward with the *Y Combinator*.  

Part 1 is all about defining the *Y Combinator*, so let's do that!
> The Y Combinator is the abstract *Functional Programming* definition of recursion

Here it is in **Javascript**:
```javascript
//yes this is working javascript code, it really works. run "node ./y.js" and see for yourself
 using = only => functionApplication => (
        functionApplication(only)),

    youCan = doAnythingLike => normalCode =>
        (doAnythingLike(functions => using(functions)(using(normalCode)
            (normalCode)))),

    functions = (doRecursionAnd=doFactorial) => youCan(doRecursionAnd), 
    just = functions => using(functions())(functions())
```

But here it is really:
**ex. 3-1: The Y Combinator in Javascript**
```javascript
//courtesy of Rosetta Code https://rosettacode.org/wiki/Y_combinator
const Y = fn => (x => x(x))(y => fn(a => y(y)(a)))

//Where we're headed:
const Y = fn => (function x)(arguments)
```

Confusing, huh? That's a lot of symbols. If you follow the link to Rosetta Code, there are definitions of the Y Combinator in a number of different languages, as well as a number of different **Javascript** definitions:

**ex. 3-2: Variations of the Javascript Y Combinator**
```javascript
const
    Y= // Except for the η-abstraction necessary for applicative order languages, this is the formal Y combinator.
        f=>((g=>(f((...x)=>g(g)(...x))))
            (g=>(f((...x)=>g(g)(...x))))),
    Y2= // Using β-abstraction to eliminate code repetition.
        f=>((f=>f(f))
            (g=>(f((...x)=>g(g)(...x))))),
```

I wasn't following any of this. I had failed out of understanding any number of articles trying to explain the *Y Combinator*, using many different languages to explain how it works, to no avail...

...then I saw those spread operators `...x` in `ex. 3-2`. An hour later, I understood the *Y Combinator*.


In every other *Y Combinator* articles, the authors attempt to engineer the *Y Combinator* from scratch. I'm going to take the exact opposite approach, **we are going to *reverse engineer* the *Y Combinator*.** Let's *start* with the *Y Combinator* and apply our way to understanding!

---

## Part 2: *Why Combinator?*
> If you're not sure what recursion is, reread this sentence. 
>
> -Winner of the Internet


> Ultimately this is the point of the *Y Combinator*. You are able to recurse over *anonymous Functions* and *Lambda Expressions*

The *Y Combinator* is a beautiful piece of code, in that it performs recursion through simple function application. Reread that first sentence until you fully grasp it. It is really that simple conceptually. The implemnetation is the hard part to understand. Once you understand the *implementation* of the **Y Combinator**, other concepts in *Functional Programming* become much simpler to appraoch and dissect, and you can even use the same methods I'm going to use to dissect future *Functional Programming* concepts you may encounter. 

We saw in Part 1 that the *Y Combinator* is simply a functional defintion of recursion. But in **Javascript** recursion is supported out-of-the-box. We all know the basic coding quiz question: **Define recursive factorial in language x**. And we all know that factorial is defined recursively in mathematics as: `!n = n * !(n-1)`, but what happens when we don't know the name of our factorial function? What happens when we need to recurse in **Javascript** on an *anonymous Function* or a *Lambda*?

I ran into this question when working on the `curryReduce` function from the *Currying* chapter. What is the name of the function `?????`? It doesn't have a name! How can I perform recursion if I don't know the name??????

**ex. 3-3: What is the name of this function?**
```javascript
const curryReduce = mathfn => ?????(arr, total = arr.shift()) 
        arr.length 
        ? ?????(arr, mathfn(total, arr.shift())) 
        : total
``` 

I was trying to *Curry* a *Function* that returned the next *Function/Lambda* that I wanted to use to reduce. But what do i call to recurse? There's no name? *Can I recurse without a Function name???*

**ex. 3-4: the reduce function as it is implemented in Chapter 2**
```javascript
const curryReduce = mathfn => 
    function recurse(arr, total = arr.shift()) { 
        return arr.length 
        ? recurse(arr, mathfn(total, arr.shift())) 
        : total
    }
```
#### Well, yes... ok, I can assign a name to an anonymous function, and this works just fine... But I'm a software developer, and being a good curious, lazy software developer, I spent hours on the internet to find away to avoid typing `function recurse(...)`

---



## Part 3: *How Combinator*


Let's flash back to example `3-2` where I said that when I noticed  `...x`, I understood the *Y Combinator* in an hour. I was working on my `curryReduce` function still, and wanted to find out how to use this neat gadget to save a few characters in my code, and learn something new. When I saw `...x`, I realized, this is *just **Javascript***. I know **Javascript**. No number of symbols in a row shall intimidate me! 

From Rosetta Code, I chose the *minimalist solution*, and a sheet of graph paper. Let's look at the following declaration, and dissect it step by step. 

---

**ex. 3-5 The Y Combinator**
```javascript
//courtesy of Rosetta Code https://rosettacode.org/wiki/Y_combinator
const Y = fn => (x => x(x))(y => fn(a => y(y)(a)))
```

`Y` is a *Function*. How do we know that? in ES6 we can assign functions using `=>` so anything following the pattern `const functionName = args => ` is afunction:  `Y = fn =>` shows us that it is a function that takes an argument. If we look inside the function, `fn(...)` shows us that the argument `fn` is a *Function* as well! 

> `Y` is a *Currying Function*!!!

We already know how to handle *Currying* a *Function* from Chapter 1! First, we need to give `Y` a *Function*!

**ex. 3-6: Reducing the Y Combinator: Step 1: Curry *`fn`***
```javascript
const Y = fn => (x => x(x))(y => fn(a => y(y)(a)))
const recursiveY = Y(someFunction)

//Let's show our work and reduce recursiveY

//apply someFunction to Y, so recursive Y === the result of somefunction applied to Y
recursiveY === (fn => (x => x(x))(y => fn(a => y(y)(a))))(someFunction)


(fn => (x => x(x))(y => fn(a => y(y)(a))))(someFunction)

//Apply someFunction
(someFunction => (x => x(x))(y => someFunction(a => y(y)(a))))(fn := someFunction)

//Final Reduction:
(x => x(x))(y => someFunction(a => y(y)(a))))

recursiveY === (x => x(x))(y => someFunction(a => y(y)(a))))
```

Whoof! That's still a whole lot of symbols and placeholders, and that was only 1 step! What could it possibly do??

Before we continue, let's do some mental simplification. We know what an anonymous *Function* looks like. Here is the example I used for anonymous *Functions* in Chapter 1.

**ex. 3-7: Anonymous Functions**
```javascript
//anonymous functions
(x => x + 5)

(function (x) {
    return x + 5
})
```
We also know what an IIFE is from Chapter 1:

**ex. 3-8: IIFE**
```javascript
(x => x + 5)(4)//returns 9
```
So let's look back at our final reduction and break it up into smaller pieces with a few line breaks:

**ex. 3-9: Reducing the Y Combinator**
```javascript
//STEP 1: ex.3-6
recursiveY === (x => x(x))(y => someFunction(a => y(y)(a))))

(x => x(x))
    (y => 
        someFunction(a => 
            y(y)(a)
        )
    )
)
```

>`(x=> x(x))` is a *Function*!!!

This was a real breakthrough for me. When I realized that this statement was a function, I rewrote the whole thing, and replaced it with the word `function x`, signifying a function that takes 1 parameter without caring about the implementation of that function.

**ex. 3-10: Reducing the Y Combinator**
```javascript
(function x)
    (y => 
        someFunction(a => 
            y(y)(a)
        )
    )
)
```
> But if`(x=> x(x))` is a *Function*, and there are parens following it, then it must be an *IIFE*!!!! 

That means that everything in the next set of parens is an argument to the *Function*! Really covering alot of ground this way. Let's repeat the previous step and replace everything inside the following parnens, ***the arguments***, the complex series of arrows and symbos with a simple placeholer:

**ex. 3-11: Reducing the Y Combinator**
```javascript
(function x)
    (arguments)

recursiveY === (function x)(arguments)
```

That looks a *lot* more manageable. It was about this point, with my graph paper and pen that I took a big sigh of relief. I had read defeatist comments on blog posts from 'round the internet, bemoaning the fact that the author of the comment has tried for a decade or more to understand the *Y Combinator* and, I thought to myself, *I can do this.* So can you!

---

Let's reduce our *Function* expression even further: We'll call our `arguments` `"Z"` and attempt to understand what happens next. 

**ex. 3-12: Reducing the Y Combinator: Step 2: Substiute `Z` as `arguments`**
```javascript
//STEP 1: ex. 3-6
recursiveY === (x => x(x))(y => someFunction(a => y(y)(a))))

//------------------------------------
//STEP 2:
recursiveY === (x => x(x))(Z)

//Pass Z as arguments
(x => x(x))(Z)

//Apply Z
(Z => Z(Z))(x := Z)

//Result
Z(Z)
recursiveY === Z(Z)
```
That wasn't so scary, was it? Let's take the next step and resubstitue the real value of Z:

**ex. 3-13: Reducing the Y Combinator: Step 2.5: Substiute `(y => fn(a => y(y)(a)))` as `Z`**
```javascript
//STEP 2.5:
//Show Z's real value
Z === (y => someFunction(a => y(y)(a)))

//Pass Z as arguments
//Take a moment and chew on this one, this is the hardest step
Z(Z) === (y => someFunction(a => y(y)(a)))(Z)

//Pass the real value of Z as arguments
Z(Z) === (y => someFunction(a => y(y)(a)))
            ((y => someFunction(a => y(y)(a))))
```
**WHOAH!!!* Now *THAT **IS**** scary. That's a lot more symbols than we started with! But don't worry, let's take it one step at a time, continuing to show our work as we go.

**ex. 3-14: Reducing the Y Combinator: Step 3: Applying `Z` throughout**
```javascript
//lets abstract our arguments again!!!
Z(Z) === (y => someFunction(a => y(y)(a)))
            ((y => someFunction(a => y(y)(a)))

Z(Z) === (y => someFunction(a => y(y)(a)))
            (Z)//replace ((y=>...)) with Z placeholder, because we already defined Z
            

//---------------------
//STEP 3: 
//pass Z to IIFE as Y
(y => someFunction(a => y(y)(a))(Z)

//Apply Z
(Z => someFunction(a => Z(Z)(a))(y := Z)

someFunction(a => Z(Z)(a))

//Results: these are all equivalent statements
//equivalent statements
recursiveY === Z(Z) 
      Z(Z) === someFunction(a => Z(Z)(a))
recursiveY === someFunction(a => Z(Z)(a))

```
Well that wasn't so bad was it? Almost painless. We've seen this sort of thing before with our *Currying* examples. It turns out that `y` in `(y => ...)` is also *Currying*. We create some new function, so we curry old functions into the new funtion to create something compeltly new!

**ex. 3-15: See that `recursiveY` is just a curried function**
```javascript
    //for comparison
const compare = op => (a,b) => op(a,b) ? a : b,
    min = compare(lt),
    max = compare(gt)

//after our reduction, we're left with: 
recursiveY === someFunction(a => Z(Z)(a))
```
`someFunction` is a *Function*, and it takes arguments. It takes 1 argument to be exact. 

It takes a function as an argument. `Z(Z)` returns a function that takes 1 argument, that argument is `a`. The function returned from Z(Z) is `someFunction`!!!!  which takes a 1 argument, a function, and returns a function that accepts 1 argument, that argument is `a`........ etc

What happens if we invoke `someFunction`?

```javascript
//what will happen here???
someFunction(a => Z(Z)(a))(5)
```
*let's take a look!*

---

> Now let's define someFunction

We've gone a bout as fur as we kin go in our reduction, so let's define a basic anonymous recursive function for us to use to continue our reduction. To define a function that is able to be `y combinator'd`, we need to define a function of the following format: `myFn => fn => arg => baseCase ? /*implement base case*/ : fn(arg)` We need a *Curried* function to pass to `Y`:

Yes, I'm going to use `factorial` just like everyone else. We see that our implementation of `factorial` *Curries* fn, and returns a *Function*:

**ex. 3-16: Define a function to pass into the Y Combinator**
```javascript

const factorial = fn => num => 
    num > 1 
    ? num * fn(num-1) 
    : 1
```

Let's reduce the factorial function by passing `someFunc` as the first argument:
**ex. 3-17: Reduction of the factorial function**
```javascript
const factorial = fn => num => 
    num > 1 
    ? num * fn(num-1) 
    : 1

factorial(someFunc) 

//after currying
num => num > 1 ? num * someFunc(num-1) : 1

factorial(someFunc) === num => 
    num > 1 
    ? num * someFunc(num-1) 
    : 1
```
---
That's simple enough. So what if we were to compose `Y` with `factorial`? Using our reduction of our previous *Y Combinator Function* as a template, we can show our new `factorial` *Function being passed, and reduced. Focus on how this is exactly the same as before, only I swapped the names `recursiveY` with `factorialY` and `someFunction` with `factorial`. 

**ex. 3-17: Reducing `factorialY`**
```javascript
const factorial = fn => num => 
    num > 1 
    ? num * fn(num-1) 
    : 1

const Y = fn => (x => x(x))(y => fn(a => y(y)(a)))
const factorialY = Y(factorial)

//STEP 1: ex. 3-6
factorialY === (x => x(x))(y => factorial(a => y(y)(a))))
```
Let's use mental simplification and substitution again:
```javascript
//STEP 2: ex. 3-12
factorialY === (x => x(x))(Z)
factorialY === Z(Z)
Z          === (y => factorial(a => y(y)(a))))
Z(Z)       === (y => factorial(a => y(y)(a)))
        /*args*/ ((y => factorial(a => y(y)(a)))

//STEP 3: ex. 3-14
factorialY === Z(Z) 
      Z(Z) === factorial(a => Z(Z)(a))
factorialY === factorial(a => Z(Z)(a))
```
# STOP!!!
## This is the important part:
## `factorial(a => Z(Z)(a))`

Let's revisit our earlier question. What happens when we invoke `factorial` now? 

```factorial(a => Z(Z)(a))(5)```

---

That last phrase should make a lot of sense to you at this point. If you're struggling following up until now, I recommend taking a break, and coming back and starting from the top when your brain is fully unbended. Either that, or write this reduction step by step on some paper for yourself and see how simple the reduction really is. 

So how do we use this function? Just the same way you would use any factorial function. You feed it a number to start, and it will calculate factorial!

> This is a working example. Copy paste into your favorite REPL or your browsers developer console and watch it work! Don't worry, we'll break down the application in the next example

**ex. 3-18: Working example**
```javascript
const factorial = fn => num => 
    num > 1 
    ? num * fn(num-1) 
    : 1

const Y = fn => (x => x(x))(y => fn(a => y(y)(a)))
const factorialY = Y(factorial)
console.log(factorialY(5))
```
---

What we are left with is the function `factorial`, being passed a *Lambda* expression as an argument. The final step in understanding how the *Y Combinator* is creating recursion is to evaluate that *Lambda* expression. When we invoke `factorialY` with `5`, we end up with:

**ex. 3-19: Reducing the Y Combinator: Step 4: Calculating Factorial**
```javascript        
//pass 5 as argument to lambda
factorialY(5) === factorial(a => Z(Z)(a))(5)

factorial(a => Z(Z)(a))(5)

//lets drop the factorial function call for now and evaluate this Lambda
factorial((a => Z(Z)(a))(5))
(a => Z(Z)(a))(5)
(5 => Z(Z)(5))(a := 5)
Z(Z)(5)

//resubstitue our function call
//Final result:
factorial(Z(Z)(5))

factorialY(5) === factorial(Z(Z)(5))
```
We're almost there. Now all we need to do is pass our arguments to the factorial function

**ex. 3-19: Reducing the Y Combinator: Step 4: Calculating Factorial *continued***
```javascript
factorialY(5) === factorial(Z(Z)(5))

//STEP 4.1: Curry the function
factorial(Z(Z)) === factorial(Z(Z))


factorial(Z(Z)) === (fn => num => num > 1 ? num * fn(num-1) : 1)
        /*args to factorial*/ (Z(Z))

//let's sustitue in the REAL value of Z(Z)
//Pass Z
factorial(factorial(a => Z(Z)(a))) === (fn => num => num > 1 ? num * fn(num-1) : 1)
        /*args to factorial*/ (fn := Z := factorial(a => Z(Z)(a)))

//Apply Z
(factorial(a => Z(Z)(a)) => num => num > 1 ? num * factorial(a => Z(Z)(a))(num-1): 1)
    (fn := factorial(a => Z(Z)(a)))

//Final Result:
num => num > 1 ? num * factorial(a => Z(Z)(a))(num-1): 1

factorial(Z(Z)) === num => num > 1 ? num * factorial(a => Z(Z)(a))(num-1): 1

//STEP 4.2: Pass 5 to the partially evaluated curried function, the final result of 4.1
//resubstitue 5
factorial(Z(Z)(5))

//pass 5
(num => num > 1 ? num * factorial(a => Z(Z)(a))(num-1): 1)(5)

//Apply 5
(5 => 5 > 1 ? 5 * factorial(a => Z(Z)(a))(5-1): 1)(num := 5)

//We're left with
5 > 1 // true 
? 5 * factorial(a => Z(Z)(a))(5 - 1 /*5 - 1 === 4*/) // pass 4 into the lambda where a := 4
: 1
```
Congratulations, you've just followed the *Y Combinator* to its recursive stage!!! If you're struggling to understand still, understand this important fact:

> The above code snippet is recursive!!!! You can simply read and reread the above snippet to see the recursion at work. When you get back to the top, pass 4 instead of 5, then 3, then 2, etc...

Reread the above code noting that every time you see `Z(Z)` mentally replace it with `factorial(a => Z(Z)(a))`. If we were to attempt to unpack `Z(Z)` we would have something like the following:

**ex. 3-20: Recursion visualized, applying Z(Z) perpetually**
```javascript

factorial(a => 
    factorial(a => 
        factorial(a => 
            factorial(a => 
                factorial(a => 
                    factorial(a => 
                        factorial(a => ....(a))...)
```
... beacuse `Z(Z) === factorial(a => Z(Z)(a))`. It is a recursive definition! 

---

## Part 4: Reduce Combinator

We've just observed the most basic implementation of the Y Combinator. The huge takeaway is that the original anonymous function `(x => x(x))` simply kicks off the recursive defintion and is never used after the intial reduction. After `(x=> x(x))(Z)`, we're left with `Z(Z) === fn(a => Z(Z)(a))`. Let me put this plainly:

```javscript
Z(Z)

and 

fn(a => Z(Z)(a)) 

are equivalent. 
```

They mean exactly the same thing. If that's the case, then `a` is really the arguments we want to pass to our `fn`! Now you can modify this code to match any number of arguments to your custom recursive functions! Let's revisit our `curryReduce` function from Chapter 1.

**ex. 3-3: What is the name of this function?**
```javascript
const curryReduce = mathfn => ?????(arr, total = arr.shift()) 
        arr.length 
        ? ?????(arr, mathfn(total, arr.shift())) 
        : total
``` 
Now we don't need the name of the function, and we simply need to modify our *Y Combinator to match the arguments being passed to our custom recursive function! We need to curry some *`fn`* inside `curryReduce`, and add an extra argument to *Y Combinator*


**Working example, Copy paste into your favorite REPL**
```javascript
//Helper math functions
const mul = (x,y) => x * y,
    sum = (x,y) => x + y

//special reduce, which curries an extra fn, our recursive Z(Z)
const yReduce = mathfn => fn => (arr, total = arr.shift()) => 
    arr.length 
    ? fn(arr, mathfn(total, arr.shift())) 
    : total,
    mulAll = yReduce(mul),
    sumAll = yReduce(sum)

//Passes 2 arguments, (a,b) to our fn
const Y = fn => (x => x(x))(y => fn((a,b) => y(y)(a,b))),
    ySum = Y(sumAll), //pass our sumYReduce function to Y
    yMul = Y(mulAll)  //pass our mulYReduce function to Y

console.log(yMul([1,2,3]))
console.log(ySum([1,2,3]))
```
---
If you're still confused, then please reread this tutorial. I tried to provide a step by step reduction of the simplest pieces of the *Y Combinator* in a linear format, reverse engineering the function and how it works. If you would like to see more of my thought process about how I derived this tutorial, please see the originalNotes.txt contained in this file.