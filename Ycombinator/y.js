(why = (
    isGreaterThan = (x,y) => y > x,
    subtract = (x,y) => x - y, 
    multiply = (x, y) => x * y,

    theYCombinatorPoem = why ? 'because' : 'I can',

    instructions = `In order to understand the "Y" Combinator,
    read everything from line 22 to line 30 like an English sentence,
    pausing at each line break,
    like a comma or period in English.
    For extra fun, read line 47`,

    doFactorial = recursively => (forEveryNumber,
        iff = number => isGreaterThan(1, number),
        eachResultingNumber = greaterThanOne =>
            recursively(subtract(greaterThanOne, 1)),
        then = withNumber =>
            multiply(eachResultingNumber(withNumber), withNumber)) => iff(forEveryNumber) ? then(forEveryNumber) : 1,

    using = only => functionApplication => (
        functionApplication(only)),

    youCan = performRecursionOver => normalCode =>
        (performRecursionOver(functions => using(functions)(using(normalCode)
            (normalCode)))),

    functions = (doRecursionAnd=doFactorial) => youCan(doRecursionAnd), 
    just = functions => using(functions())(functions())

) => ({
    youCan, doFactorial, just, using, functions
}));

(testTheYCombinator = (
    testArr,
    { youCan, doFactorial, just, using, functions } = why(),

    facts = testArr.map(stopit => ({
        [stopit]: just(functions)(stopit)
    })),

    factsRound2/*fight!!!*/ = testArr.map(okYouMadeYourPoint => ({
        [okYouMadeYourPoint + ': result ']:
        using(functions())(youCan(doFactorial))(okYouMadeYourPoint)
    }))    

) => ({
    facts, factsRound2
}))
console.log(testTheYCombinator([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))
///for simple usage of the y combinator, 
/// import functions and using
/// pass functions a function of the type fn -> fn -> a -> fn(a)
///pass using functions twice

///for example:
///loop = fn => args => fn(args)
///loopy = functions(loop)
///using(loopy)(loopy)
