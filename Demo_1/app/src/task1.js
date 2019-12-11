
export function chessBoard(height, width, symbol) {
    if (!isValidInput(height, width, symbol)) {
        const err = {
            status: 'failed',
            reason: "width and height must be integers in the range (0,100], symbol must have string type and length = 1"
        }
        throw new Error(JSON.stringify(err, null, 2));
    }
    let strBoard = '';
    symbol += '  ';
    const row = symbol.repeat(width).trim() + '\n';
    for (let i = 0; i < height; i++) {
        i % 2 === 0 ? strBoard += row : strBoard += ' ' + row;
    }
    return strBoard;
}

function isValidInput(height, width, symbol) {
    return Number.isInteger(height) &&
        Number.isInteger(width) &&
        typeof symbol === 'string' &&
        height > 0 && height <= 100 &&
        width > 0 && width <= 100 &&
        symbol.length === 1;
}