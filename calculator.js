
class Calculator {
    constructor() {
        this.display = '';
        this.previousValue = null;
        this.operation = null;
        this.shouldResetDisplay = false;
    }


    addNumber(num) {
        if (this.shouldResetDisplay) {
            this.display = '';
            this.shouldResetDisplay = false;
        }
        this.display += num;
        return this.display;
    }


    addDecimal() {
        if (this.shouldResetDisplay) {
            this.display = '0.';
            this.shouldResetDisplay = false;
            return this.display;
        }
        if (!this.display.includes('.')) {
            this.display += '.';
        }
        return this.display;
    }

    setOperation(op) {
        if (this.display === '') return;

        if (this.previousValue === null) {
            this.previousValue = parseFloat(this.display);
        } else if (this.operation) {
            this.calculate();
        }

        this.operation = op;
        this.shouldResetDisplay = true;
        return this.display;
    }


    calculate() {
        if (this.operation === null || this.previousValue === null) {
            return this.display;
        }

        const currentValue = parseFloat(this.display);
        let result;

        switch (this.operation) {
            case '+':
                result = this.previousValue + currentValue;
                break;
            case '-':
                result = this.previousValue - currentValue;
                break;
            case '*':
                result = this.previousValue * currentValue;
                break;
            case '/':
                result = currentValue !== 0 ? this.previousValue / currentValue : 0;
                break;
            default:
                return this.display;
        }

        this.display = result.toString();
        this.previousValue = null;
        this.operation = null;
        this.shouldResetDisplay = true;
        return this.display;
    }


    getPercentage() {
        const value = parseFloat(this.display);
        return (value / 100).toString();
    }


    toggleSign() {
        const value = parseFloat(this.display);
        this.display = (-value).toString();
        return this.display;
    }


    clear() {
        this.display = '';
        this.previousValue = null;
        this.operation = null;
        this.shouldResetDisplay = false;
        return this.display;
    }


    backspace() {
        this.display = this.display.slice(0, -1);
        return this.display;
    }


    getDisplay() {
        return this.display || '0';
    }
}


const calculator = new Calculator();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Calculator;
}
