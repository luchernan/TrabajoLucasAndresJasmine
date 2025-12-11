if (typeof module !== 'undefined' && typeof require !== 'undefined') {
    global.Calculator = require('../calculator');
}

describe("Calculadora", function () {
    let calc;

    beforeEach(function () {
        calc = new Calculator();
    });

    it("debería iniciar con display vacío o 0", function () {
        expect(calc.getDisplay()).toBe("0");
    });

    it("debería agregar números al display", function () {
        calc.addNumber("4");
        expect(calc.getDisplay()).toBe("4");
        calc.addNumber("3");
        expect(calc.getDisplay()).toBe("43");
    });

    it("debería realizar sumas correctamente", function () {
        calc.addNumber("5");
        calc.setOperation("+");
        calc.addNumber("3");
        calc.calculate();
        expect(calc.getDisplay()).toBe("8");
    });

    it("no debería permitir dividir entre cero", function () {
        calc.addNumber("8");
        calc.setOperation("/");
        calc.addNumber("0");
        calc.calculate();
        expect(Number(calc.getDisplay())).toBeLessThanOrEqual(0);
    });

    // it("debería fallar si esperamos un resultado incorrecto", function () {
    //     calc.addNumber("2");
    //     calc.setOperation("+");
    //     calc.addNumber("2");
    //     calc.calculate();
    //     expect(calc.getDisplay()).toBe("5"); // intencionalmente mal
    // });

    it("debería resetear el display tras una operación", function () {
        calc.addNumber("5");
        calc.setOperation("+");
        calc.addNumber("3");
        calc.calculate();
        calc.addNumber("2");
        expect(calc.getDisplay()).toBe("2");
    });
    it("debería manejar múltiples operaciones encadenadas", function () {
        calc.addNumber("10");
        calc.setOperation("-");
        calc.addNumber("2");
        calc.calculate(); // 8
        calc.setOperation("*");
        calc.addNumber("3");
        calc.calculate(); // 24
        expect(calc.getDisplay()).toBe("24");
    });


    it("debería realizar restas correctamente", function () {
        calc.addNumber("9");
        calc.setOperation("-");
        calc.addNumber("4");
        calc.calculate();
        expect(calc.getDisplay()).toBe("5");
    });

    it("debería multiplicar correctamente", function () {
        calc.addNumber("6");
        calc.setOperation("*");
        calc.addNumber("7");
        calc.calculate();
        expect(calc.getDisplay()).toBe("42");
    });

    it("debería dividir correctamente", function () {
        calc.addNumber("8");
        calc.setOperation("/");
        calc.addNumber("2");
        calc.calculate();
        expect(calc.getDisplay()).toBe("4");
    });

    it("debería manejar división entre 0 devolviendo 0", function () {
        calc.addNumber("8");
        calc.setOperation("/");
        calc.addNumber("0");
        calc.calculate();
        expect(calc.getDisplay()).toBe("0");
    });

    it("debería limpiar correctamente", function () {
        calc.addNumber("7");
        calc.clear();
        expect(calc.getDisplay()).toBe("0");
    });

    it("debería eliminar el último carácter con backspace", function () {
        calc.addNumber("12");
        calc.backspace();
        expect(calc.getDisplay()).toBe("1");
    });

    it("debería convertir a porcentaje correctamente", function () {
        calc.addNumber("50");
        expect(calc.getPercentage()).toBe("0.5");
    });



});

