function infixToPostfix(infix) {
    let stack = [];
    let result = [];

    for (let temp of infix) {
        if (isNumber(temp))
            result.push(temp);
        else if (temp === '(')
            stack.push('(');
        else if (temp === ')') {
            while (stack[stack.length - 1] !== '(') {
                result.push(stack.pop());
            }
            stack.pop();
        } else {
            while (stack.length && getPriority(temp) <= getPriority(stack[stack.length - 1])) {
                result.push(stack.pop());
            }
            stack.push(temp);
        }
    }

    while (stack.length !== 0) {
        result.push(stack.pop());
    }
    return result;
}

function isNumber(op) {
    return !isNaN(op);
}

// for separate numbers and operators
function separator(str) {
    const arr = [...Object.keys(operators), '(', ')'];
    for (let op of arr) {
        str = str.replaceAll(op, ` ${op} `);
    }
    // for negative numbers
    str = str.replaceAll(`(  - `, `(  -`);
    // remove empty elements
    str = str.split(' ').filter((value) => {
        return value !== '';
    });
    return str;
}

function getPriority(op) {
    if (op === '-' || op === '+')
        return 1;
    if (op === '*' || op === '/')
        return 2;
    if (op === '^')
        return 3;
    return 0;
}

const operators = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
    '^': (a, b) => a ** b
};
