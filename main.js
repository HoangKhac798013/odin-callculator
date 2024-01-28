function add(a, b) {
  return +a + +b;
}

function subtract(a, b) {
  return +a - +b;
}

function multiply(a, b) {
  return +a * +b;
}

function divide(a, b) {
  if (+b !== 0) {
    return +a / +b;
  } else {
    console.log("ERROR: Can't divide by 0");
    return 0;
  }
}

function operate(operation) {
  let output = window[operation.operation](
    operation.operator1,
    operation.operator2
  );
  display.value = output;
  console.log("output is", output);
  return output;
}

let numpad = document.querySelector("#numpad");

console.log(numpad);

for (let i = 2; i >= 0; --i) {
  let Div = document.createElement("div");
  for (let j = 1; j <= 3; j++) {
    let currentButton = document.createElement("button");
    setMultiAttribute(currentButton, "class:numbers");
    currentButton.textContent = j + i*3;
    Div.appendChild(currentButton);
  }
  numpad.appendChild(Div)
}

let currentButton = document.createElement("button");
setMultiAttribute(currentButton, "class:numbers");
currentButton.textContent = 0;
numpad.appendChild(currentButton)

let operationPad = document.querySelector("#operations");
let displayCon = document.querySelector("#display");
let opPadFirstDiv = document.createElement("div");
let opPadSecondDiv = document.createElement("div");
let opPadThirdDiv = document.createElement("div");

let addButton = document.createElement("button");
setMultiAttribute(addButton, "class:operations", "name:add");
addButton.textContent = "+";
opPadFirstDiv.appendChild(addButton);

let subtractButton = document.createElement("button");
setMultiAttribute(subtractButton, "class:operations", "name:subtract");
subtractButton.textContent = "-";
opPadFirstDiv.appendChild(subtractButton);

let multiplyButton = document.createElement("button");
setMultiAttribute(multiplyButton, "class:operations", "name:multiply");
multiplyButton.textContent = "*";
opPadFirstDiv.appendChild(multiplyButton);

let divideButton = document.createElement("button");
setMultiAttribute(divideButton, "class:operations", "name:divide");
divideButton.textContent = "/";
opPadSecondDiv.appendChild(divideButton);

let clearButton = document.createElement("button");
setMultiAttribute(clearButton, "id:clearButton");
clearButton.textContent = "C";
clearButton.addEventListener("click", () => {
  operation = createOperation("", "null", "", "first");
});
opPadSecondDiv.appendChild(clearButton);

let equalKey = document.createElement("button");
setMultiAttribute(equalKey, "id:equalKey");
equalKey.textContent = "=";
opPadSecondDiv.appendChild(equalKey);

// opPadThirdDiv.appendChild(currentButton)
operationPad.appendChild(opPadFirstDiv);
operationPad.appendChild(opPadSecondDiv);
// operationPad.appendChild(opPadThirdDiv);

let display = document.createElement("input");
setMultiAttribute(display, "id:display", "readOnly:true");
displayCon.appendChild(display);

let buttons = document.querySelectorAll("button");
console.log(buttons);
buttons.forEach((element) => {
  element.addEventListener("click", () => {
    if (element.textContent !== "=") {
      display.value = !(element.textContent === "C")
        ? display.value + element.textContent
        : " ";
    }
  });
});

let operation = createOperation("", "", "", "first");

let operator = document.querySelectorAll(".numbers");
operator.forEach((element) => {
  element.addEventListener("click", () => {
    console.log(operation.status);
    switch (operation.status) {
      case "first": {
        operation.operator1 += element.textContent;
        console.log("operator 1 is: ", operation.operator1);
        break;
      }
      case "second": {
        operation.operator2 += element.textContent;
        console.log("operator 2 is: ", operation.operator2);
        break;
      }
      case "computationFinishedEqual": {
        display.value = element.textContent;
        operation.operator1 = element.textContent;
        console.log("operator 1 is: ", operation.operator1);
        operation.status = "first";
        operation.operator2 = "";
        operation.operation = "";
        break;
      }
    }
  });
});

let math = document.querySelectorAll(".operations");
math.forEach((element) => {
  element.addEventListener("click", () => {
    console.log(operation.status);
    switch (operation.status) {
      case "first": {
        operation.status = "second";
        operation.operation = element.getAttribute("name");
        console.log("Setting operation first");
        break;
      }
      case "second": {
        if (operation.operator2 !== "") {
          caseSecond();
          operation.operation = element.getAttribute("name");
          display.value += element.textContent;
        } else {
          operation.operation = element.getAttribute("name");
          display.value = display.value.slice(0, -2);
          display.value += element.textContent;
        }
        break;
      }
      case "computationFinishedEqual": {
        operation.status = "second";
        operation.operation = element.getAttribute("name");
        break;
      }
    }
  });
});

equalKey.addEventListener("click", () => {
  if (operation.status === "second" && operation.operator2 !== "") {
    caseSecond();
    operation.status = "computationFinishedEqual";
  }
});

function caseSecond() {
  let computation = operate(operation);
  operation.operator1 = computation;
  operation.operation = "";
  operation.operator2 = "";
}

function createOperation(operator1, operation, operator2, status) {
  return {
    operator1,
    operation,
    operator2,
    status,
  };
}

function setMultiAttribute(el) {
  for (let i = 1; i < arguments.length; i++) {
    console.log(arguments[i]);
    let pair = arguments[i].split(":");
    console.log("pari is:", pair);
    el.setAttribute(pair[0], pair[1]);
  }
}
