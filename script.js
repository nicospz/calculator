var display = document.querySelector("input");
const buttons = document.querySelectorAll("button");
const clearButton = document.querySelector("#clearButton");
const equalButton = document.querySelector("#equal");
const pointButton = document.querySelector("#point");
const parenthesisButton = document.querySelector("#parenthesis");



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

clearButton.addEventListener("click", function (e) {
    display.value = "";
    return;
});


equalButton.addEventListener("click", function () {
    if (display.value[display.value.length - 1] == "+" ||
        display.value[display.value.length - 1] == "-" ||
        display.value[display.value.length - 1] == "*" ||
        display.value[display.value.length - 1] == "/") {
        alert("That's not a valid expression!");
        return;
    }
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
    // first remove useless parenthesis
    expression = removeUselessParenthesis(expression);
    // see if the expression is a number
    if (expression == parseFloat(expression)) {
        return expression;
    }
    // see if the expression has sums
    if (noSums(expression)) {
        // If it doesn't have sums, then it's a product
        //get the multiplicating factors first
        var factors = multiplicatingFactors(expression);
        var result = product(factors);
        // then get the dividing factors
        factors = dividingFactors(expression);
        var result = result / (product(factors));
        return result;
    }
    // if it has sums, sum...
    var addends = addendsOf(expression);
    var result = sum(addends);
    // if it has substractions, substract...
    var subtrahends = subtrahendsOf(expression);
    var result = result - (sum(subtrahends));

    return result;

}

function multiplicatingFactors(expression) {
    var factors = [];
    var j = 0;
    var inParenthesis = 0;
    for (i = 0; i <= expression.length; i++) {
        if (expression[i] == "(") {
            inParenthesis++;
            continue
        }
        if (expression[i] == ")") {
            inParenthesis--;
            continue;
        }
        if ((expression[i] == "*" || expression[i] == "/" || !expression[i]) && inParenthesis == 0) {
            if (j == 0) {
                var factor = expression.slice(0, i);
            } else {
                var factor = expression.slice(j + 1, i);
            }
            if (expression[j] == "*" || j==0) {
                factors.push((factor));
            }
            j = i;
        }
    }
    return factors;
}
function dividingFactors(expression) {
    var factors = [];
    var j = 0;
    var inParenthesis = 0;
    for (i = 0; i <= expression.length; i++) {
        if (expression[i] == "(") {
            inParenthesis++;
            continue
        }
        if (expression[i] == ")") {
            inParenthesis--;
            continue;
        }
        if ((expression[i] == "/" || expression[i] == "*" || !expression[i]) && inParenthesis == 0) {
            if (expression[j] == "/") {
                var factor = expression.slice(j + 1, i);
                factors.push((factor));
            }
            j = i;
        }
    }
    return factors;
}
function addendsOf(expression) {
    var addends = [];
    var j = 0;
    var inParenthesis = 0;
    for (i = 0; i <= expression.length; i++) {
        if (expression[i] == "(") {
            inParenthesis++;
            continue
        }
        if (expression[i] == ")") {
            inParenthesis--;
            continue;
        }
        if ((expression[i] == "+" || expression[i] == "-" || !expression[i]) && inParenthesis == 0) {
            if (j == 0) {
                var addend = expression.slice(0, i);
            } else {
                var addend = expression.slice(j + 1, i);
            }
            if (expression[j] == "+" || j==0) {
                addends.push((addend));
            }
            j = i;
        }
    }
    return addends;
}
function subtrahendsOf(expression) {
    var subtrahends = [];
    var j = 0;
    var inParenthesis = 0;
    for (i = 0; i <= expression.length; i++) {
        if (expression[i] == "(") {
            inParenthesis++;
            continue
        }
        if (expression[i] == ")") {
            inParenthesis--;
            continue;
        }
        if ((expression[i] == "+" || expression[i] == "-" || !expression[i]) && inParenthesis == 0) {
            if (expression[j] == "-") {
                var subtrahend = expression.slice(j + 1, i);
                subtrahends.push((subtrahend));
            }
            j = i;
        }
    }
    return subtrahends;
}
function noSums(expression) {
    if (firstAddend(expression) == expression) {
        return true;
    }
    return false;
}
function firstAddend(expression) {
    var inParenthesis = 0;
    var addend = "";
    for (i = 0; i < expression.length - 1; i++) {
        if (expression[i] == "(") {
            inParenthesis++;
            continue
        }
        if (expression[i] == ")") {
            inParenthesis--;
            continue;
        }
        if ((expression[i] == "+" || (expression[i] == "-" && i != 0)) && inParenthesis == 0) {
            addend = expression.slice(0, i)
            return addend;
        }
    }
    addend = expression;
    return addend;
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
function sum(array) {
    var sum = 0;
    for (let x of array) {
        x = evaluate(x);
        sum = add(sum, x);
    }
    return sum;
}
function product(array) {
    var product = 1;
    for (let x of array) {
        x = evaluate(x);
        product = product * x;
    }
    return product;
}
function power(x, y) {
    return x ** y;
}