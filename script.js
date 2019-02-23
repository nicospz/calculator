var display = document.querySelector("input");
const buttons = document.querySelectorAll("button");
const clearButton = document.querySelector("#clearButton");
const equalButton = document.querySelector("#equal");
const pointButton = document.querySelector("#point");

buttons.forEach(button => button.addEventListener("click", function (e) {
    display.value += this.value;
    return;
}));

clearButton.addEventListener("click", function (e) {
    display.value = "";
    return;
});
equalButton.addEventListener("click", function () {
    for (i = 0; "1234567890.".indexOf(display.value[i]) != -1; i++) {}
    var number2 = "";
    const number1 = parseFloat(display.value.slice(0, i));
    const operator = display.value[i];
    number2 = parseFloat(display.value.slice(i + 1));
    if (!number2 && operator) {
        alert("You need to add a second number!");
    }
    display.value = operate(operator, number1, number2);
    return;
});
pointButton.addEventListener("click", function() {
    for (i = 0; "1234567890.".indexOf(display.value[i]) != -1; i++) {
    }
    var number2 = "";
    const number1 = parseFloat(display.value.slice(0, i));
    const operator = display.value[i];
    number2str = display.value.slice(i + 1);
    number2 = parseFloat(number2str)
    if (display.value.indexOf(".") == -1) {
        display.value += ".";
    }
    if (operator && number2str.indexOf(".") == -1) {
        display.value += ".";
        return;
    }
    return;
});





function add(x, y) {
    return x + y;
}

function subtract(x, y) {
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
    if(operator && !y) {
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