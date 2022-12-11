function infixToPostfix(infix) {
    // infix is String
    let operators = [];
    let operands = [];

    for (let i = 0; i < infix.length; i++) {
        if (infix[i] === '(') {
            operators.push(infix[i]);
        } else if (infix[i] === ')') {
            while (operators.length !== 0 &&
            operators[operators.length - 1] !== '(') {
                let a = operands.pop();
                let b = operands.pop();
                let op = operators.pop();
                operands.push(op + b + a);
            }
            operators.pop();
        } else if (!isOperator(infix[i])) {
            operands.push(String(infix[i]));
        } else {
            while (operators.length &&
            getPriority(infix[i]) <= getPriority(operators[operators.length - 1])) {
                let a = operands.pop()
                let b = operands.pop()
                let op = operators.pop();
                operands.push(op + b + a);
            }
            operators.push(infix[i]);
        }
    }

    while (operators.length !== 0) {
        let a = operands.pop()
        let b = operands.pop()
        let op = operators.pop();
        operands.push(op + b + a);
    }

    return operands.pop();
}

function isOperator(op) {
    return !(op >= '0' && op <= '9');
}

function getPriority(op) {
    if (op === '-' || op === '+')
        return 1;
    else if (op === '*' || op === '/')
        return 2;
    else if (op === '^')
        return 3;
}
