
function updateDisplay() {
    const displayElement = document.getElementById('display');
    displayElement.textContent = calculator.getDisplay() || '0';
}

function handleNumber(num) {
    calculator.addNumber(num);
    updateDisplay();
}

function handleDecimal() {
    calculator.addDecimal();
    updateDisplay();
}

function handleOperation(op) {
    calculator.setOperation(op);
    updateDisplay();
}

function handleEquals() {
    calculator.calculate();
    updateDisplay();
}

function handleClear() {
    calculator.clear();
    updateDisplay();
}

function handleBackspace() {
    calculator.backspace();
    updateDisplay();
}

function handlePercentage() {
    const percentage = calculator.getPercentage();
    calculator.display = percentage;
    updateDisplay();
}

document.addEventListener('DOMContentLoaded', function () {
    updateDisplay();
});


document.addEventListener('keydown', function (event) {
    const key = event.key;

    if (key >= '0' && key <= '9') {
        handleNumber(key);
    } else if (key === '.') {
        event.preventDefault();
        handleDecimal();
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        event.preventDefault();
        handleOperation(key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        handleEquals();
    } else if (key === 'Backspace') {
        event.preventDefault();
        handleBackspace();
    } else if (key === 'Escape') {
        event.preventDefault();
        handleClear();
    }
});
