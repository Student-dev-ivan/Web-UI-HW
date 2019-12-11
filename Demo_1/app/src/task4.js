
export function biggestPalindrome(number) {
    if (!isValidInput(number)) {
        const err = {
            status: 'failed',
            reason: 'Number should be in the range (10, 9007199254740991]'
        }
        throw new Error(JSON.stringify(err, null, 2));
    }
    const sNumber = number.toString();
    const numberLength = sNumber.length
    let substrLength = sNumber.length;
    const palindromes = [];

    while (substrLength > 1) {
        for (let i = 0; i + substrLength <= numberLength; i++) {
            const substr = sNumber.substring(i, substrLength + i);
            if (isPalindrome(substr)) {
                palindromes.push(substr);
            }
        }
        const palindromesLength = palindromes.length;
        if (palindromesLength === 0) {
            substrLength--;
            continue;
        }
        if (palindromesLength === 1) {
            return palindromes[0];
        } else {
            const maxPalindrome = {
                value: 0,
                sum: 0
            };
            palindromes.forEach((item, index) => {
                const digitsSum = palindromes[index].split('').reduce((sum, digit) => sum + Number(digit), 0);
                if (maxPalindrome.sum < digitsSum) {
                    maxPalindrome.value = item;
                    maxPalindrome.sum = digitsSum;
                }
            })
            return maxPalindrome.value;
        }
    }
    return 0;

}

function isPalindrome(string) {
    return string === string.split('').reverse().join('');
}

function isValidInput(number) {
    return Number.isInteger(number) && number > 10 && number < 9007199254740991;
}



