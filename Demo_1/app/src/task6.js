
export function numericalSequence(length, minSquare) {
    if (!isValidInput(length, minSquare)) {
        const err = {
            status: 'failed',
            reason: 'Length must be integer in the range (0,100], min square must be positive and less than 9007199254740991'
        };
        throw new Error(JSON.stringify(err, null, 2));
    }
    let startNumber = Math.ceil(Math.sqrt(minSquare));
    const sequence = [];

    while (length > 0) {
        sequence.push(startNumber++);
        length--;
    }
    return sequence.join(', ');
}

function isValidInput(length, minSquare) {
    return Number.isInteger(length) && !isNaN(Number(minSquare)) &&
        length > 0 && length <= 100 &&
        minSquare > 0 && minSquare < 9007199254740991;
}