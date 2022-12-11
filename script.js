'use strict';
function calculate(str) {
    str = separator(str);
    return postfixEval(infixToPostfix(str));
}

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

function postfixEval(postfix) {
    let stack = [];

    for (let temp of postfix) {
        if (isNumber(temp))
            stack.push(temp);
        else if (temp in operators) {
            let right =+ stack.pop();
            let left =+ stack.pop();
            if (isNaN(left)) {left = 0;}
            let value = operators[temp](left, right);
            stack.push(value);
        }
    }

    if (stack.length > 1)
        alert('Error');

    return stack.pop();
}

function clearScreen() {
    document.getElementById('result').value = '';
}

function removeLast() {
    let str = document.getElementById('result').value;
    document.getElementById('result').value =
        str.substring(0, str.length - 1);
}

function display(value) {
    document.getElementById('result').value += value;
}

function equal() {
    let str = document.getElementById('result').value;
    let result = calculate(str);
    document.getElementById('last-result').value = str + ' = ' + result;
    document.getElementById('result').value = result;
}

function radical() {
    let str = document.getElementById('result').value;
    let result = Math.sqrt(calculate(str));
    document.getElementById('last-result').value = '√' + str + ' = ' + result;
    document.getElementById('result').value = result;
}

function logarithm() {
    let str = document.getElementById('result').value;
    let result = Math.log(calculate(str));
    document.getElementById('last-result').value = 'log ' + str + ' = ' + result;
    document.getElementById('result').value = result;
}