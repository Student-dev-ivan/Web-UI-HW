
export function fibonacciSequence(context) {
    if (!isValidInput(context)) {
        const err = {
            status: 'failed',
            reason: 'You should choose one input min,max or length. Lenght must be in the range (0,79]. Min and max must be in the range [0,9007199254740991]'
        };
        throw new Error(JSON.stringify(err, null, 2));
    }
    return context.length === undefined ? fibonacciMinMax(context.min, context.max) : fibonacciByLength(context.length);
}
function fibonacciByLength(length = 0) {
    let a = 0;
    let b = 1;
    const sequence = [a, b];
    if (length <= 2) {
        return sequence.slice(0, length);
    }
    for (let i = 3; i <= length; i++) {
        const c = a + b;
        [a, b] = [b, c];
        sequence.push(c);
    }
    return sequence;
}
function fibonacciMinMax(min, max) {
    let a = 0;
    let b = 1;
    let i = 1;
    const sequence = [a, b];

    while (sequence[i] <= max) {
        const c = a + b;
        sequence[++i] = c;
        [a, b] = [b, c];
    }

    return sequence.filter(number => number >= min && number <= max);
}
function isValidInput(context) {
    if (!(context.length === undefined || context.max === undefined && context.min === undefined)) {
        return false;
    }
    if (context.length === undefined) {
        return Number.isInteger(context.min) && Number.isInteger(context.min) &&
            context.min >= 0 && context.min < 9007199254740991 &&
            context.max >= 0 && context.max < 9007199254740991 &&
            context.min < context.max;
    } else {
        return Number.isInteger(context.length) && context.length >= 0 && context.length < 80;
    }
}