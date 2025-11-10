const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

let currentInput = '';
let operator = '';
let previousInput = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent;

        if (buttonText >= '0' && buttonText <= '9' || buttonText === '.') {
            currentInput += buttonText;
            display.textContent = currentInput;
        } else if (button.classList.contains('operator')) {
            if (currentInput === '') return;
            if (previousInput !== '') {
                calculate();
            }
            operator = buttonText;
            previousInput = currentInput;
            currentInput = '';
        } else if (button.classList.contains('equals')) {
            if (currentInput === '' || previousInput === '') return;
            calculate();
            operator = '';
        } else if (button.classList.contains('clear')) {
            clear();
        }
    });
});

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    previousInput = '';
    display.textContent = currentInput;
}

function clear() {
    currentInput = '';
    operator = '';
    previousInput = '';
    display.textContent = '0';
}