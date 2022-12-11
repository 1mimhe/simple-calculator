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
