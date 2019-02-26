var display = document.querySelector("input");
const buttons = document.querySelectorAll("button");
const clearButton = document.querySelector("#clearButton");
const equalButton = document.querySelector("#equal");
const pointButton = document.querySelector("#point");
const parenthesisButton = document.querySelector("#parenthesis");
const minusplusButton = document.querySelector('#minusplus');


buttons.forEach(button => button.addEventListener("click", function (e) {
    //Prevents adding more than one operator
    if ((this.value == "+" ||
        this.value == "-" ||
        this.value == "*" ||
        this.value == "/") &&
        (display.value[display.value.length - 1] == "+" ||
            display.value[display.value.length - 1] == "-" ||
            display.value[display.value.length - 1] == "*" ||
            display.value[display.value.length - 1] == "/")) {
        display.value = display.value.slice(0, display.value.length - 1) + this.value;
        return;
    }
    ////
    //Prevents adding operators when display is empty
    if ((this.value == "+" ||
        this.value == "-" ||
        this.value == "*" ||
        this.value == "/") && display.value == "") {
        return;
    }
    //
    //If last character is a point and an operator was clicked, delete it
    if ((this.value == "+" ||
        this.value == "-" ||
        this.value == "*" ||
        this.value == "/") &&
        (display.value[display.value.length - 1] == ".")) {
        display.value = display.value.slice(0, display.value.length - 1);
    }
    display.value += this.value;
    return;
}));

clearButton.addEventListener("click", function () {
    display.value = "";
    return;
});

minusplusButton.addEventListener("click", function () {
    var expression = display.value
    var lastNumber;
    if (expression == parseFloat(expression)) {
        display.value = "(-" + expression;
    }
    for (i = expression.length - 1; i >= 0; i--) {
        if (expression[i] == "+" ||
            expression[i] == "-" ||
            expression[i] == "*" ||
            expression[i] == "/") {
            if (expression[i - 1] == "(") {
                display.value = expression.slice(0, i - 1) + expression.slice(i + 1);
                return;
            }
            lastNumber = expression.slice(i + 1);
            display.value = expression.slice(0, i + 1) + "(-" + lastNumber;
            return;
        }
    }
})

equalButton.addEventListener("click", function () {
    if (display.value[display.value.length - 1] == "+" ||
        display.value[display.value.length - 1] == "-" ||
        display.value[display.value.length - 1] == "*" ||
        display.value[display.value.length - 1] == "/") {
        alert("That's not a valid expression!");
        return;
    }
    //Complete parenthesis
    var expression = display.value;
    var parenthesis = 0;
    for (i = 0; i < expression.length; i++) {
        if (expression[i] == "(") {
            parenthesis++;
            continue
        }
        if (expression[i] == ")") {
            parenthesis--;
            continue;
        }
    }
    for (i = 0; i < parenthesis; i++) {
        display.value += ")";
    }
    //-----------------------------
    display.value = evaluate(display.value);
    return;
});

pointButton.addEventListener("click", function () {
    if (!display.value) {
        display.value += "0.";
        return;
    }
    //Check if last number has a point already
    for (i = 0; "1234567890.".indexOf(display.value[display.value.length - 1 - i]) != -1; i++) {
    }
    var lastNumber = display.value.slice(display.value.length - i, display.value.length);
    if (lastNumber.indexOf(".") != -1) {
        return;
    }
    //----------------
    if ("+-*/".indexOf(display.value[display.value.length - 1]) != -1) {
        display.value += "0.";
        return;
    }
    display.value += ".";
    return;
});

parenthesisButton.addEventListener('click', function () {
    var openParenthesis = 0;
    for (i = 0; i < display.value.length; i++) {
        if (display.value[i] == "(") { openParenthesis++; }
        if (display.value[i] == ")") { openParenthesis--; }
    }
    if (display.value[display.value.length - 1] == "+" ||
        display.value[display.value.length - 1] == "-" ||
        display.value[display.value.length - 1] == "*" ||
        display.value[display.value.length - 1] == "/") {
        display.value += "(";
        openParenthesis++;
        return;
    }
    if ("1234567890)".indexOf(display.value[display.value.length - 1]) != -1) {
        if (openParenthesis > 0) {
            display.value += ")";
            openParenthesis--;
            return;
        }
        if (openParenthesis == 0) {
            display.value += "*(";
            return;
        }
    }
});
function evaluate(expression) {
    var tree = expressionTree(expression);
    return evaluateNode(tree._root);
}
function Node(data) {
    this.data = data;
    this.parent = null;
    this.children = [];
}
function Tree(data) {
    var node = new Node(data);
    this._root = node;
}
function removeUselessParenthesis(expression) {
    if (expression.startsWith("(")) {
        var inParenthesis = 1;
        for (i = 1; i < expression.length; i++) {
            if (expression[i] == "(") {
                inParenthesis++;
            }
            if (expression[i] == ")") {
                inParenthesis--;
            }
            if (inParenthesis == 0 && i < expression.length - 1) {
                break;
            }
            if (inParenthesis == 0 && i == expression.length - 1) {
                return expression.slice(1, expression.length - 1)
            }
        }
        return expression;
    }
    return expression;
}
function isSum(expression) {
    var inParenthesis = 0;
    for (i = expression.length - 1; i >= 0; i--) {
        if (expression[i] == ")") {
            inParenthesis++;
            continue;
        }
        if (expression[i] == "(") {
            inParenthesis--;
            continue;
        }
        if ((expression[i] == "+" || expression[i] == "-") && inParenthesis == 0) {
            return true;
        }
    }
    return false;
}
function expressionTree(expression) {
    expression = removeUselessParenthesis(expression);
    if (expression == parseFloat(expression)) {
        return new Tree(expression);
    }
    if (isSum(expression)) {
        return summationTree(expression)

    }
    return multiplicationTree(expression)
}
function summationTree(expression) {
    var inParenthesis = 0;
    //Parse from right to left
    for (let i = (expression.length - 1); i >= 0; i--) {
        if (expression[i] == ")") {
            inParenthesis++;
            continue;
        }
        if (expression[i] == "(") {
            inParenthesis--;
            continue;
        }
        if ((expression[i] == "+" || expression[i] == "-") && inParenthesis == 0) {
            var tree = new Tree(expression[i])
            var left = expression.slice(0, i);
            var leftchild = expressionTree(left)._root;
            tree._root.children.push(leftchild);
            tree._root.children[0].parent = tree._root;
            var right = expression.slice(i + 1);
            var rightchild = expressionTree(right)._root;
            tree._root.children.push(rightchild);
            tree._root.children[1].parent = tree._root;
            return tree;
        }
    }
}
function multiplicationTree(expression) {
    var inParenthesis = 0;
    //Parse from right to left
    for (let i = (expression.length - 1); i >= 0; i--) {
        if (expression[i] == ")") {
            inParenthesis++;
            continue;
        }
        if (expression[i] == "(") {
            inParenthesis--;
            continue;
        }
        if ((expression[i] == "*" || expression[i] == "/") && inParenthesis == 0) {
            var tree = new Tree(expression[i])
            var left = expression.slice(0, i);
            var leftchild = expressionTree(left)._root;
            tree._root.children.push(leftchild);
            tree._root.children[0].parent = tree._root;
            var right = expression.slice(i + 1);
            var rightchild = expressionTree(right)._root;
            tree._root.children.push(rightchild);
            tree._root.children[1].parent = tree._root;
            return tree;
        }
    }
}
function evaluateNode(node) {
    var data = node.data;
    if (data == parseFloat(data)) {
        return parseFloat(data);
    }
    if (data == "+" ||
        data == "*" ||
        data == "/" ||
        data == "-") {
        var left = evaluateNode(node.children[0]);
        var right = evaluateNode(node.children[1]);
        return operate(data, left, right);
    }
}
function removeUselessParenthesis(expression) {
    if (expression.startsWith("(")) {
        var inParenthesis = 1;
        for (i = 1; i < expression.length; i++) {
            if (expression[i] == "(") {
                inParenthesis++;
            }
            if (expression[i] == ")") {
                inParenthesis--;
            }
            if (inParenthesis == 0 && i < expression.length - 1) {
                break;
            }
            if (inParenthesis == 0 && i == expression.length - 1) {
                return expression.slice(1, expression.length - 1)
            }
        }
        return expression;
    }
    return expression;
}
// BASIC OPERATIONS
function add(x, y) { return parseFloat(x) + parseFloat(y); }
function substract(x, y) { return parseFloat(x) - parseFloat(y); }
function multiply(x, y) { return parseFloat(x) * parseFloat(y); }
function divide(x, y) { return parseFloat(x) / parseFloat(y); }
function operate(operator, x, y) {
    if (x && !operator) { return x; }
    if (operator && !y) {
        if (operator == ")") {
            return x;
        }
        return x + operator;
    }
    if (operator == "+") { return add(x, y); }
    if (operator == "-") { return substract(x, y); }
    if (operator == "*") { return multiply(x, y); }
    if (operator == "/") { return divide(x, y); }
}
function power(x, y) {
    return x ** y;
}