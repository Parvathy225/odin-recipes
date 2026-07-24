function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "Nice try 😏";
    }
    return a / b;
}

function operate(operator, a, b) {

    a = Number(a);
    b = Number(b);

    switch(operator){

        case "+":
            return add(a,b);

        case "-":
            return subtract(a,b);

        case "*":
            return multiply(a,b);

        case "/":
            return divide(a,b);

        default:
            return b;
    }

}

const display = document.getElementById("display");

let firstNumber = "";
let secondNumber = "";
let operator = "";
let waitingForSecond = false;
let resultShown = false;

function updateDisplay(value){
    display.textContent = value;
}

document.querySelectorAll(".digit").forEach(button=>{

    button.addEventListener("click",()=>{

        if(resultShown){
            firstNumber="";
            operator="";
            secondNumber="";
            resultShown=false;
        }

        if(!waitingForSecond){

            firstNumber += button.textContent;
            updateDisplay(firstNumber);

        }

        else{

            secondNumber += button.textContent;
            updateDisplay(secondNumber);

        }

    });

});

document.getElementById("decimal").addEventListener("click",()=>{

    if(!waitingForSecond){

        if(!firstNumber.includes(".")){
            firstNumber = firstNumber || "0";
            firstNumber += ".";
            updateDisplay(firstNumber);
        }

    }

    else{

        if(!secondNumber.includes(".")){
            secondNumber = secondNumber || "0";
            secondNumber += ".";
            updateDisplay(secondNumber);
        }

    }

});

document.querySelectorAll(".operator").forEach(button=>{

    button.addEventListener("click",()=>{

        if(firstNumber==="") return;

        if(waitingForSecond && secondNumber!==""){

            let result = operate(operator,firstNumber,secondNumber);

            if(typeof result==="number"){
                result = Math.round(result*1000000)/1000000;
            }

            updateDisplay(result);

            firstNumber = result.toString();
            secondNumber = "";

        }

        operator = button.textContent;
        waitingForSecond = true;
        resultShown = false;

    });

});

document.getElementById("equals").addEventListener("click",()=>{

    if(firstNumber==="" || secondNumber==="" || operator==="") return;

    let result = operate(operator,firstNumber,secondNumber);

    if(typeof result==="number"){
        result = Math.round(result*1000000)/1000000;
    }

    updateDisplay(result);

    firstNumber = result.toString();
    secondNumber = "";
    operator = "";
    waitingForSecond = false;
    resultShown = true;

});

document.getElementById("clear").addEventListener("click",()=>{

    firstNumber="";
    secondNumber="";
    operator="";
    waitingForSecond=false;
    resultShown=false;

    updateDisplay("0");

});

document.getElementById("backspace").addEventListener("click",()=>{

    if(resultShown) return;

    if(waitingForSecond){

        secondNumber = secondNumber.slice(0,-1);
        updateDisplay(secondNumber || "0");

    }

    else{

        firstNumber = firstNumber.slice(0,-1);
        updateDisplay(firstNumber || "0");

    }

});

document.addEventListener("keydown",(e)=>{

    if(!isNaN(e.key)){
        document.querySelectorAll(".digit").forEach(btn=>{
            if(btn.textContent===e.key){
                btn.click();
            }
        });
    }

    if(["+","-","*","/"].includes(e.key)){
        document.querySelectorAll(".operator").forEach(btn=>{
            if(btn.textContent===e.key){
                btn.click();
            }
        });
    }

    if(e.key==="Enter"){
        document.getElementById("equals").click();
    }

    if(e.key==="Backspace"){
        document.getElementById("backspace").click();
    }

    if(e.key==="."){
        document.getElementById("decimal").click();
    }

    if(e.key==="Escape"){
        document.getElementById("clear").click();
    }

});
