var display = document.querySelector("input");
const buttons = document.querySelectorAll("button");
const clearButton = document.querySelector("#clearButton");
const equalButton = document.querySelector("#equal");
const pointButton = document.querySelector("#point");
const parenthesisButton = document.querySelector("#parenthesis");
const minusplusButton = document.querySelector('#minusplus');
const divisionButton = document.querySelector('#division');
const plusButton = document.querySelector('#plus');
const minusButton = document.querySelector('#minus');
const multButton = document.querySelector('#mult');
const delButton = document.querySelector('#del');
const percentageButton = document.querySelector('#percentage');
const numberButtons = [];
for (i = 0; i < 10; i++) {
    const numberButton = document.querySelector('#button' + i);
    numberButtons.push(numberButton)
}

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
    //Prevents adding operators when last character is an opening parenthesis
    if ((this.value == "+" ||
        this.value == "-" ||
        this.value == "*" ||
        this.value == "/") && display.value[display.value.length-1] == "(") {
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
    //If last character is a percentage symbol, add a multiplication in-between
    if (display.value[display.value.length - 1] == "%" && this.value == parseFloat(this.value)) {
        display.value += "*" + this.value;
        return;
    }
    //--------------
    //If last character is a closing parenthesis, add a multiplication in-between
    if (display.value[display.value.length - 1] == ")" && this.value == parseFloat(this.value)) {
        display.value += "*" + this.value;
        return;
    }
    //--------------
    //Add commas every 3 digits
    display.value += this.value;
    var i = display.value.length;
    if (this.value == parseFloat(this.value)) {
        while (i >= -1) {
            if (display.value[i] == "+" ||
                display.value[i] == "-" ||
                display.value[i] == "*" ||
                display.value[i] == "(" ||
                display.value[i] == "/" ||
                i == -1) {
                var lastNumber = display.value.slice(i + 1);
                break;
            }
            if (display.value[i] == "."){
                return;
            }
            i--;
        }
        lastNumber = removeCommas(lastNumber);
        display.value = display.value.slice(0, i + 1)
        lastNumber = insertCommas(lastNumber);
        display.value += lastNumber;
        return;
    };
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
delButton.addEventListener("click", function () {
    display.value = display.value.slice(0, display.value.length - 1);
})
percentageButton.addEventListener("click", function () {
    var expression = display.value
    var lastNumber;
    //No double percentages
    if (expression[expression.length - 1] == "%") {
        return;
    }
    //
    if (expression == parseFloat(expression)) {
        display.value = expression + "%";
    }
    for (i = expression.length - 2; i >= 0; i--) {
        if (expression[i] == "+" ||
            expression[i] == "-" ||
            expression[i] == "*" ||
            expression[i] == "/" ||
            expression[i] == "(") {
            /* if (expression[i - 1] == "(") {
                display.value = expression.slice(0, i - 1) + expression.slice(i + 1);
                return;
            } */
            lastNumber = expression.slice(i + 1);
            if (lastNumber == parseFloat(lastNumber)) {
                display.value = expression.slice(0, i + 1) + lastNumber + "%";
                return;
            }
        }
    }
});
equalButton.addEventListener("click", function () {
    var expression = removeCommas(display.value);
    if (display.value[display.value.length - 1] == "+" ||
        display.value[display.value.length - 1] == "-" ||
        display.value[display.value.length - 1] == "*" ||
        display.value[display.value.length - 1] == "/") {
        alert("That's not a valid expression!");
        return;
    }
    //Complete parenthesis
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
        expression += ")";
    }
    //-----------------------------
    expression = evaluate(expression);
    expression = insertCommas(expression.toString())
    display.value = expression;
    return;
});
pointButton.addEventListener("click", function () {
    if (!display.value) {
        display.value += "0.";
        return;
    }
    if (display.value[display.value.length-1] == ")") {
        display.value += "*0.";
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
    if ("+-*/(".indexOf(display.value[display.value.length - 1]) != -1) {
        display.value += "0.";
        return;
    }
    display.value += ".";
    return;
});
parenthesisButton.addEventListener('click', function () {
    if (!display.value || display.value[display.value.length - 1] == "(") {
        display.value += "(";
    }
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

//Keyboard actions
window.addEventListener("keydown", function (e) {
    if (e.key == "%") {
        simulateClick(percentageButton);
    }
    if (e.key == parseFloat(e.key)) {
        simulateClick(numberButtons[e.key])
    }
    if (e.keyCode == 13) {
        simulateClick(equalButton);
    }
    if (e.key == "=") {
        simulateClick(equalButton);
    }
    if (e.key == "/") {
        simulateClick(divisionButton);
    }
    if (e.key == "*" || e.keyCode == 88) {
        simulateClick(multButton);
    }
    if (e.key == "+") {
        simulateClick(plusButton);
    }
    if (e.key == "-") {
        simulateClick(minusButton);
    }
    if (e.key == ".") {
        simulateClick(pointButton);
    }
    if (e.key == "(" || e.key == ")") {
        simulateClick(parenthesisButton);
    }
    if (e.keyCode == 8) {
        simulateClick(delButton);
    }
    if (e.keyCode == 67) {
        simulateClick(clearButton);
    }
})
/**
 * Simulate a click event.
 * @public
 * @param {Element} elem  the element to simulate a click on
 */
var simulateClick = function (elem) {
    // Create our event (with options)
    var evt = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
    });
    // If cancelled, don't dispatch our event
    var canceled = !elem.dispatchEvent(evt);
};
function evaluate(expression) {
    expression = percentagesToDivision(expression);
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
function isSum(expression) {
    var inParenthesis = 0;
    for (i = expression.length - 1; i > 0; i--) {
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
    while (expression != removeUselessParenthesis(expression)) {
        expression = removeUselessParenthesis(expression);
    }
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
    for (let i = (expression.length - 1); i > 0; i--) {
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
function percentagesToDivision(expression) {
    for (i = 0; i < expression.length; i++) {
        if (expression[i] == "%") {
            expression = expression.slice(0, i) + "/100" + expression.slice(i + 1);
        }
    }
    return expression;
}
function insertCommas(expression) {
    if(hasPoint(expression)){
        var point = 1;
        var k = expression.length;
        while (point == 1){
            if (expression[k] == "."){
                point == 0;
                break;
            }
            k--;
        }
        for (i = 2; i < k; i++) {
            var j = k - i - 1;
            if (i % 4 == 3) {
                expression = expression.slice(0, j + 1) + "," + expression.slice(j + 1);
            }
        }
        return expression;
    }


    for (i = 2; i < expression.length; i++) {
        var j = expression.length - i - 1;
        if (i % 4 == 3) {
            expression = expression.slice(0, j + 1) + "," + expression.slice(j + 1);
        }
    }

    return expression;
}
function hasPoint(expression){
    if(expression !== parseInt(expression).toString()){
        return true;
    }
    return false;
}
function removeCommas(expression) {
    for (i = 0; i < expression.length; i++) {
        if (expression[i] == ",") {
            expression = expression.slice(0, i) + expression.slice(i + 1);
        }
    }
    return expression;
}
function lastNumber(expression) {
    for (i = expression.length - 1; i >= 0; i--) {
        if (expression[i] == "+" ||
            expression[i] == "-" ||
            expression[i] == "*" ||
            expression[i] == "(" ||
            expression[i] == "/") {
            lastNumber = expression.slice(i + 1);
        }
    }
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

// Remove rectangle when focusing a button
function handleFirstTab(e) {
    if (e.keyCode === 9) { // the "I am a keyboard user" key
        document.body.classList.add('user-is-tabbing');
        window.removeEventListener('keydown', handleFirstTab);
    }
}
window.addEventListener('keydown', handleFirstTab);
// ----------------------