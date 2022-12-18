'use strict';

function calculate(str) {
    str = separator(str);
    return postfixEval(infixToPostfix(str));
}

const operators = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
    '^': (a, b) => a ** b
};

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

function postfixEval(postfix) {
    let stack = [];

    for (let temp of postfix) {
        if (isNumber(temp))
            stack.push(temp);
        else if (temp in operators) {
            let right = +stack.pop();
            let left = +stack.pop();
            if (isNaN(left) && temp === '-') {
                left = 0;
            }
            let value = operators[temp](left, right);
            stack.push(value);
        }
    }

    if (stack.length > 1)
        return false;


    return stack.pop();
}

function isNumber(op) {
    return !isNaN(op);
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

// DOM Part
function clearScreen() {
    if (document.getElementById('result').value === 'SYNTAX ERROR!')
        document.getElementById('result').style.color = 'black';
    document.getElementById('result').value = '';
}

function removeLast() {
    let str = document.getElementById('result').value;
    if (str === 'SYNTAX ERROR!')
        clearScreen();
    else
        document.getElementById('result').value =
            str.substring(0, str.length - 1);
}

function display(value) {
    let lastValue = document.getElementById('result').value;
    if (lastValue === 'SYNTAX ERROR!')
        clearScreen();
    let lastCharOfValue = lastValue.slice(-1);
    if (value === '-' && lastCharOfValue in operators)
        document.getElementById('result').value += '(' + value;
    else
        document.getElementById('result').value += value;
}

function equal() {
    let str = document.getElementById('result').value;
    if (!str)
        return;
    let result = calculate(str);
    if (!isNumber(result)) {
        syntaxError();
    } else {
        document.getElementById('last-result').value = str + ' = ' + result;
        document.getElementById('result').value = result;
    }
}

function radical() {
    let str = document.getElementById('result').value;
    let result = Math.sqrt(calculate(str));
    if (!isNumber(result)) {
        syntaxError();
    } else {
        document.getElementById('last-result').value = '√' + str + ' = ' + result;
        document.getElementById('result').value = result;
    }
}

function logarithm() {
    let str = document.getElementById('result').value;
    let result = Math.log(calculate(str));
    if (!isNumber(result)) {
        syntaxError();
    } else {
        document.getElementById('last-result').value = 'log ' + str + ' = ' + result;
        document.getElementById('result').value = result;
    }
}

function sinus() {
    let str = document.getElementById('result').value;
    let result = Math.sin(calculate(str));
    document.getElementById('last-result').value = 'sin ' + str + ' = ' + result;
    document.getElementById('result').value = result;
}

function cosine() {
    let str = document.getElementById('result').value;
    let result = Math.cos(calculate(str));
    document.getElementById('last-result').value = 'cos ' + str + ' = ' + result;
    document.getElementById('result').value = result;
}

function tangent() {
    let str = document.getElementById('result').value;
    let result = Math.tan(calculate(str));
    if (!isNumber(result)) {
        syntaxError();
    } else {
        document.getElementById('last-result').value = 'tan ' + str + ' = ' + result;
        document.getElementById('result').value = result;
    }
}

function syntaxError() {
    document.getElementById('result').value = 'SYNTAX ERROR!';
    document.getElementById('result').style.color = 'red';
}