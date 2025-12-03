const getBankJoltage = (bank, numDigits = 2) => {
    const digits = [];
    let cursor = 0;
    for (let i = numDigits; i > 0; i -= 1) {
        const digitOptions = bank.slice(cursor, bank.length - (i - 1));
        const maxDigit = Math.max(...digitOptions.split('').map(n => parseInt(n, 10)));
        const digitIndex = digitOptions.indexOf(maxDigit);
        cursor += digitIndex + 1;
        digits.push(maxDigit);
    }

    return parseInt(digits.join(''), 10);
};

export const calc1 = (input) => {
    const numDigits = 2;
    const maxJoltages = input.filter(x => x !== '').map((x) => getBankJoltage(x, numDigits));
    return maxJoltages.reduce((a, b) => a + b, 0);
}

export const calc2 = (input) => {
    const numDigits = 12;
    const maxJoltages = input.filter(x => x !== '').map((x) => getBankJoltage(x, numDigits));
    return maxJoltages.reduce((a, b) => a + b, 0);
}
