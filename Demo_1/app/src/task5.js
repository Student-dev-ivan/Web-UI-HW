
export function luckyTickets(context) {
    if (!isValidInput(context)) {
        const err = {
            status: 'failed',
            reason: 'Min and max values must be numbers in the range [0,999999]'
        };
        throw new Error(JSON.stringify(err, null, 2));
    }
    let complexCount = 0;
    let simpleCount = 0;
    let min = Number(context.min);
    let max = Number(context.max);
    while (min <= max) {
        if (simpleMethod(min)) {
            simpleCount++;
        }
        if (complexMethod(min)) {
            complexCount++;
        }
        min++;
    }
    if (complexCount === simpleCount) {
        return getResult('No winner', simpleCount, complexCount);
    }

    return simpleCount > complexCount ?
        getResult('Simple', simpleCount, complexCount) :
        getResult('Complex', simpleCount, complexCount);
}

function simpleMethod(num) {
    const digits = [...num.toString().padStart(6, 0)].map(item => Number(item));
    return digits[0] + digits[1] + digits[2] === digits[3] + digits[4] + digits[5];
}

function complexMethod(num) {
    const digits = [...num.toString().padStart(6, 0)].map(item => Number(item));
    return digits[0] + digits[2] + digits[4] === digits[1] + digits[3] + digits[5];
}

function getResult(winnerName, simpleCount, complexCount) {
    return {
        winner: winnerName,
        simple: simpleCount,
        complex: complexCount
    };
}

function isValidInput(context) {
    return typeof context === 'object' && !isNaN(Number(context.min)) && !isNaN(Number(context.max)) &&
        context.min >= 0 && context.min <= 999999 &&
        context.max >= 0 && context.max <= 999999 &&
        context.min <= context.max;
}