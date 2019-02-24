var display = document.querySelector("input");
const buttons = document.querySelectorAll("button");
const clearButton = document.querySelector("#clearButton");
const equalButton = document.querySelector("#equal");
const pointButton = document.querySelector("#point");

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
    display.value += this.value;
    return;
}));

clearButton.addEventListener("click", function (e) {
    display.value = "";
    return;
});
/* equalButton.addEventListener("click", function () {
    for (i = 0; "1234567890.".indexOf(display.value[i]) != -1; i++) { }
    var number2 = "";
    const number1 = parseFloat(display.value.slice(0, i));
    const operator = display.value[i];
    number2 = parseFloat(display.value.slice(i + 1));
    if (!number2 && operator) {
        alert("You need to add a second number!");
    }
    if (number1[number1.length - 1] == "." || number2[number2.length - 1] == ".") {
        return;
    }
    display.value = operate(operator, number1, number2);
    return;
}); */

equalButton.addEventListener("click", function () {
    display.value = evaluate(display.value);
    return;
});

pointButton.addEventListener("click", function () {
    for (i = 0; "1234567890.".indexOf(display.value[i]) != -1; i++) {
    }
    var number2 = "";
    const number1 = parseFloat(display.value.slice(0, i));
    const operator = display.value[i];
    const number2str = display.value.slice(i + 1);
    number2 = parseFloat(number2str)
    if (display.value.indexOf(".") == -1) {
        display.value += ".";
        return;
    }
    if (operator && number2str.indexOf(".") == -1) {
        display.value += ".";
        return;
    }
    return;
});


//recursive function that evaluates a expression by separating it into
// operator and 2 other expressions, which in the base case are just numbers.
function evaluate(expression) {
    for (i = 0; "1234567890.".indexOf(expression[i]) != -1; i++) {
    }
    var expression2 = "";
    var expression1 = expression.slice(0, i);
    var operator = expression[i];
    expression2 = expression.slice(i + 1);
    if (expression[expression.length - 1] == "+" ||
        expression[expression.length - 1] == "-" ||
        expression[expression.length - 1] == "*" ||
        expression[expression.length - 1] == "/" ) {
        alert("You need to add a second number!");
    }

    // Priority for multiplication and division
    if (operator == "*" || operator == "/") {
        // takes the first number from the second expression to evaluate the product 
        for (i = 0; "1234567890.".indexOf(expression2[i]) != -1; i++) {
        }
        // evaluate product
        expression1 = operate(operator,expression1,expression2.slice(0, i));
        operator = expression2[i];
        expression2 = expression2.slice(i + 1);
        // if the expression ended here, break
        if (!expression2) {
            return expression1;
        }
        // since we changed expression1 and expression2, we want to evaluate again
        // and check if the next operation is a product
        return (evaluate(expression1 + operator + expression2));
    }
    // This part of the function is only for sum and substraction
    // expression1 is always a number
    // check if expression2 is a number, if it has any operators, then evaluate it as a new expression
    if (expression2.indexOf("+") != -1 ||
        expression2.indexOf("*") != -1 ||
        expression2.indexOf("-") != -1 ||
        expression2.indexOf("/") != -1) {
        expression2 = evaluate(expression2);
    }
    return (operate(operator, parseFloat(expression1), parseFloat(expression2)));

}

function add(x, y) {
    return x + y;
}

function substract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function operate(operator, x, y) {
    if (x && !operator) {
        return x;
    }
    if (operator && !y) {
        return x + operator;
    }
    if (operator == "+") {
        return add(x, y);
    } if (operator == "-") {
        return substract(x, y);
    } if (operator == "*") {
        return multiply(x, y);
    } if (operator == "/") {
        return divide(x, y);
    }
}

function sum(array) {
    var sum = 0;
    for (let x of array) {
        sum = add(sum, x);
    }
    return sum;
}

function product(array) {
    var product = 1;
    for (let x of array) {
        product = product * x;
    }
    return product;
}

function power(x, y) {
    return x ** y;
}