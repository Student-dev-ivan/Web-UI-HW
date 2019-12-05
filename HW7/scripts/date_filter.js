
function dateFilter(value, format) {
    let date;
    if (value instanceof Date) {
        date = value;
    } else if (typeof value === 'string' || typeof value === 'number') {
        date = new Date(parseInt(value));
    } else {
        throw Error('Invalid date');
    }

    const words = format.match(/\w+/g);
    const delimiters = format.match(/\W/g);
    let result = '';
    const wordsLastIndex = words.length - 1;
    for (let i = 0; i <= wordsLastIndex; i++) {
        i === wordsLastIndex ? result += getFormattedDatePart(date, words[i]) :
            result += getFormattedDatePart(date, words[i]) + delimiters[i];
    }
    return result;
}

function getFormattedDatePart(date, part) {
    switch (true) {
        case part === 'yyyy': return date.getFullYear().toString().padStart(4, '0');
        case part === 'yy': return date.getFullYear().toString().slice(2).padStart(2, '0');
        case part === 'MM': return (date.getMonth() + 1).toString().padStart(2, '0');
        case part === 'M': return date.getMonth() + 1;
        case part === 'dd': return date.getDate().toString().padStart(2, '0');
        case part === 'd': return date.getDate();
        case part === 'HH': return date.getHours().toString().padStart(2, '0');
        case part === 'H': return date.getHours();
        case part === 'mm': return date.getMinutes().toString().padStart(2, '0');
        case part === 'm': return date.getMinutes();
        case part === 'ss': return date.getSeconds().toString().padStart(2, '0');
        case part === 's': return date.getSeconds();
        default:
            throw Error('Incorrect date format');
    }
}

const date = new Date();
console.log(date);
console.log(dateFilter(date, 'dd/MM/yyyy'));
console.log(dateFilter(date, 'd/M/yy H%m'));
console.log(dateFilter(date, 'HH:mm'));