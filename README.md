# In The Beginnering...
This is the starting point in a series of *Functional Programming* tutorials in **Javascript**. If you're learning *or teaching* *Functional Programming*, these tutorials should be of benefit to you. These tutorials are laid out from the perspective of someone who is still fresh to *Functional Programming*. This series should offer some insight as to how to approach these novel ideas, as someone unfamiliar with this style of programming. My hope is that you are able to transition from struggling with, to fully grasping these ideas. Please refer these to anyone you know that is learning, that you're teaching, and feel free to distrubute as you see fit.

---
# Road Map
- Chapter 1: *Introduction*
    - The Rules
        - 0: Mental Reduction
        - 1: Glossary Of Terms - *Please Read This Completely Before Getting Started!!!*
        - 2: No Function Composition
        - 3: Javscript Examples
        - 4: ES6 All the things
        - 5: Distribution

- Chapter 2: *Currying*
    - Part 1: Stating the problem
    - Part 2: Solving the problem
    - Part 3: Implementing the Solution
---
# Chapter 1: The Rules 
- ### *Rule Number Zero: **Mental Reduction***:
    - In math class, your teacher always made you show your work. That's because in step 5 of long division, you could forget what step 2 looked like, and become confused as to how you got to step 5. In these tutorials, there will be some complex *Lambda* and *Function* expressions. To simplify these, we will show our work, to reduce the complexity for a short time in order to help us understand things better. 
    - ##### *Z*:
        - I will often use Z as a placeholder variable to replace complex function expressions throughout these tutorials. 
        - Take the following example. This is what we call an *Immediately Invoked Function Expression (IIFE for these tutorials)*. In **Javsacript**, we can wrap functions with `()` and follow them with another set of `()`. The second set of parens is the value, or `Z`, passed as x to the next function. The example below shows the exact same functions written 2 different ways. 
        ```javascript
        (x => x + 5)(5 + 5 + 5 + 5 + 5 + 5)// IIFE - immediately invoked function expression

        let fn = x => x + 5
        fn(5 + 5 + 5 + 5 + 5 + 5)
        ```
        - In many examples I will replace `(5 + 5 + 5 + 5 + 5 + 5)` with `(Z)` to reduce the mental gymnastics required to understand what is happening. I will walk through the steps of such functions so you can see the behavior, even though it isn't syntactically correct Javascript.
        - I will also use some shorthand assignment [x:=Z] to show our work in reducing the function step by step, such as the following:

        ```javsacript
        (x => x + 5)(5 + 5 + 5 + 5 + 5 + 5)//OR
        (x => x + 5)(Z)
        (Z => Z + 5)[x:=Z] // this just means replace `x` with `Z` everywhere `x` occurs inside the function
        (Z + 5)[Z:=(5 + 5 + 5 + 5 + 5 + 5)] //this just means replace `Z` with `(5 + ... 5)` everywhere `Z` occurs inside the function
        (5 + 5 + 5 + 5 + 5 + 5) + 5 // and we all know what this means
        35
        ```


- ### *Rule Number The First: **Glossary Of Terms***

If *Functional Programming* is new to you, then the terms used exclusively inside *Functional Programming* are likely to be new also. I will be using *italics* to signify usage of these terms throughout the tutorials, so please feel free to reference these terms as needed. Please note that these are not formal definitions, but mental workarounds and shortcut definitions intended to ween you onto them, and enable your use of these concepts in your programming. These are the defintions I came up with to serve as a soft introduction to new concepts. Please consult more authoritative sources for formal definitions to these terms. 

- #### *Function:*
    - A *Function* in **Javascript** is a code snippet that can be executed anywhere that *Function* exists. *Functions* posess an *optional* name, arguments (and sometimes optional arguments), and a body. Arguments are used inside of the body of a *Function* to do some form of computation. *Functions* optionally return a value with the "return" reserved keyword. 
    - Parts of a *Function*:
        1. Optional Name
        2. Arguments
        3. Optional Arguments - Optional arguments must be passed last in your list of arguments
        4. Function Body
        5. Return Statement - Either `return` or `=>`, used under specific circumstances, keep reading for more information
    ```javascript
    let optionalFunctionName = arguments => 'body of function'
    ```
    - In these tutorials, when a *Function* name is unimportant, I will refer to them as `fn, fn1, fn2...` for the sake of brevity. To put it another way `fn` === `function` in these tutorials
    - Types of Functions:
        1. Named Function: A function declaration that has a name
        ```javascript
        let fn = x => x + 5// named function
        ```
        2. Anonymous Function: does not have a name and is almost always wrapped in `()`
        ```javascript
        (x => x + 5)// anonymous function
        ```
        3. IIFE - Immediately Invoked Function Expression: a function that is declared and executed all at once. Typically an anonymous function

        ```javascript
        (x => x + 5)(0)// IIFE
        ```
        4. Arrow Function: An arrow function can be anonymous, IIFE, or a named function, all the previous examples are arrow functions
        5. Standard Function: A function declaring that it is a function. `return` reserved keyword is required to return a value from this form of function
        ```javascript
        function fn(x) {
            return x + 5
        }
        //this form can also be anonymous
        (function (x) {
            return x + 5
        })

        ```
        6. Lambda: A function used as data. This is distinct from an anonymous function in some nuanced ways. The following link can explain more. *https://gist.github.com/ericelliott/414be9be82128443f6df*  In the below example, both `fn`, `fn1`, and the anonymous function are identical. One can be refernced, one cannot
        ```javascript
        let fn = x => x + 5 
        function fn1 (x) {
            return x + 5
        }
        (x => x + 5)

        ```

- #### *Functional Programming:*
    - A style of programming that insists on the usage of *Pure Functions* over both procedural *Functions* and Objects with methods. *Functional Programming* insist on never modifying state. Instead of changing the value of some `var a`, you instead create a new `var b` and set that equal to the result of some `fn(a)`
        - This is why there are no `setters` and `getters` in *Functional Programming*, as it modifies state
    - Tenates of *Functional Programming*
        1. Pure Functions - *see Pure Functions below*
        2. Never Modify State / No Side Effects
        3. Functions as abstractions over Object Oriented abstraction
        4. Testability

    ```javascript
    let fn = (a) => {
        a = 5 // BAD!!!! Don't modify a!!!
    }
    let fn1 = (a) => {
        let b = a + 5 // BETTER!!!! a is not modified, instead when we have a new value, we store it in a new variable
    }
    ```

- #### *Pure Function:*
    - A function that only performs operations on data passed in as arguments. *Pure Functions* have 3 mandatory parts to be considered a *Pure Function:*
        1. Arguments - *i.e. the function must accept input*
        2. Return    - *i.e. the function must produce output*
        3. No Side Effects - *see Side Effects below*
    - A *Pure Function* will always return the exact same output for the exact same input. 
    - This is an example of a *Pure Function*. It recieves input, produces output, and has no side effects.

    ```javascript
    //a pure function
    let pureFunction = hasArgument => hasArgument + 'and an implicit return statemnt.'
    pureFunction('This function has an argument ') // with this input, pureFunction will ALWAYS return 'This function has an argument and an implicit return statement.'

    //impure function
    let sideEffect = 'some string'
    let impureFuction = hasArgument => hasArgument + sideEffect //this function has no idea the state of variable sideEffect and thus is an impure function
    ```

- #### *Side Effect:*
    - The act of modifying an existing value, or referencing some value outside the scope of the function that could potentially have been modified, especially values that are not directly passed to the *Function* called. Here, `fn` creates side effects, whereas, `fn1` does not
    

    ```javascript
    let a = 0
    let fn = () => a = a + 5 //WRONG side effect

    let b = 0
    let fn1 = x => x + 5 //CORRECT, no side effects!
    fn1(b)
    ```
    - Let's show our work:
    ```javascript
    let a = 0
    let fn = () => a = a + 5
    (a + 5)
    (0 + 5)[a:=0]
    return 5
    set a = 5 //side effect!!!!

    let b = 0
    let fn1 = x => x + 5
    fn1(b) === (x => x + 5)(b)
    (b => b + 5)[x:=b]
    (b + 5)
    (0 + 5)[x:=0]
    return 5
    ```

- #### *Function Composition:*
    - Piping the result of one *Function* into the input of another *Function*. In the example below, `fn` produces an output. We want the result of that output to be sent as the argument to `fn1`.
    
    ```javascript
    let fn  = number => number + 5
    let fn1 = number => number - 5
    fn1(/*fn1 takes a number. convenient, since fn returns a number + 5!*/ fn(0)) // returns 0
    ```
    - Let's show our work:

    ```javascript
    //composing fn1 with fn
    fn1(fn(0))

    //first reduce fn(0)
    fn(0) === (number => number + 5)(0)
    (0 => 0 + 5)[number:= 0]
    (0 + 5) 
    5

    //next reduce fn1(...)
    fn1(5)
    fn1(0) === (number => number - 5)(5)
    (5 => 5 - 5)[number:= 5]
    (5 - 5) 
    0
    ```

    - This is technically *Function Composition*, but there is a more formal way to compose functions. *Real Function Composition* is a little more elegant and readable. I will (*won't*) get into that later. 

- #### *Implicit Return `=>`:*
    - The `=>` in **ES6** (so called) Arrow Function declarations is called an *Implicit Return*. So long as the statement to the right of the `=>` can be evaluated to a single value, it will `return` that value. The value can be of any type, but it must evaluate to a single value, either an array, an object, aboolean, a number, NaN, undefined, etc...
    - There is no need for the use of the `return` reserved keyword unless you put brackets around your function body
    ```javascript
    let fn  = x => x + 5
    let fn1 = x => {
        let otherVariable = 5 //with brackets, I can declare variables, and perform other actions like so
        return x + otherVariable //return needed here because of the curly brackets 
    }
    ```
- ### *Rule Number The Second: I will not cover **function composition***

Most tutorials on functional programming in **Javascript** begin with *function composition*. I'm skipping that, because in **Javascript**, we throw functions around like candy. Consider the common beginner debugging statement `console.log(fn(5))`. We know that `console.log()` is a function, check out those sexy, curvy parenthesis. That's how we know its a function! We also see that `fn()` is also a function because of those o-so-hot curvy parenthesis. Voila, *Function Composition*! If I had a *Function*:

```javascript
 function compose(fn1, fn2, args) {
    return fn1(fn2(args))
}
```
...then i could:

```javascript
compose(console.log, fn, 5)
```
...and achieve the exact same results because I'm not calling `console.log` or `fn`! *Note the absence of the sexiness parens.* We put those at the end because we aren't ready to evaluate `console.log` or `myFunc`. We want to evaluate them inside `compose`. The curvy braces are inside `compose`, as `fn1(fn2(args))`, where we want the evaluation of those functions to happen.

I lied, looks like I covered function composition a little bit. 

>*Note, we will be improving upon this composition function inside the currying tutorial. **Real** composition requires a little more finesse.*

---



- ### *Rule Number The Third: All examples will be written in **Javsacript***

If you're looking for an in depth explanation of the mathematical theory, lambda calculus, or an integrated Haskell tutorial, this tutorial is not for you. There are plenty of those sorts of tutorials out there in the *wild-wild-web*, and you've managed to select the *only functional programming tutorial that won't mention Haskell*... more than once or twice... I promise. 

These tutorials are for the Procedural/OOP programmer who is trying to break into understanding the wonderous world of *Functional Programming*. If you're not a *Haskeller* or a *Lisper* or a *Schemer* or an *ErLanger*, then these tutorials should prove to be abit more approachable.

```javascript
let example = argument => argument
console.log(example('This is an example of Javascript/Harmony/ES6'))
```

---


- ### *Rule Number The Fourth: ES6 All the things*

I am using ES6 arrow functions everywhere possible. I find the `function myFunc (x) { return x + 5}` syntax to confuse a lot of simple concepts. When I first attempted learning functional **Javascript**, all the syntax got in the way of understanding very simple ideas like *Function Composition*, and *Currying*. That being said, I'm going to be using the ES6 `let fn = x => x + 5` syntax wherever possible. 

If you're not familiar with arrow syntax, here is the least you need to know about them to follow these tutorials. Don't question them, these are just the rules

- You cannot use `this` inside an arrow function. 
- You declare a *named* arrow function like any other variable
```javascript
let namedFunction = arguments => //function body/ implicit return
```
- Instead of setting `nameFunction = function() {...body} ` you set it equal to a lambda, like this:

    ```javascript
    let fn = x => x + 5
    ```
    - A *lambda* is simply a function that can be used in the place of data such that it returns a value, and has no *side effects*.
    ```javascript 
    (x => x + 5)(10) //returns 15
    ```
    - A *side-effect* is simply the act of modifying some value that is not in the scope of your lambda. NEVER do this.
    - *Note that console.log() is considered a side-effect. IO is extremely difficult in purely functional languages like Haskell or Lisp since console.log is typically not a function passed as a parameter to the function that uses it. We're going to ignore this fact since we're using **Javascript***

    ```javascript
    //side-effecting example. This is INCORRECT Functional Programming
    let a = 5
    let fn = x => a = x + 5
    fn(10) //a now is changed to 15, this is a NO NO in functional programming
    ```
- In **Javascript** arrow functions, you don't need `()` if there is only one argument. Otherise, use regular argument syntax:
```javascript
let fn  = x => x + 5     //don't need ()
let fn1 = (x,y) => x + y //need ()
```

---

- ### *Rule Number The Fifth: Constant Improvement, and liscencing*
If you have anything to add, or corrections to make, please let me know. My e-mail is *nathan.rogers.d@gmail.com . I'm an avid learner, and always willing to learn from my mistakes, so when you find one, don't hesitate to contact me. You can also make a pull request, and I'd love to see your contributions. 

Also, I'm publishing this on github so that it is freely available for people to learn from my struggle trying to understand these areas of functional programming, so if you feel that you've gotten some benefit from reading these, please spread them around, clone this repo, or distribute however you see fit. Please enjoy.