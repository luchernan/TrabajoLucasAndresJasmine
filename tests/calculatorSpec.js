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

    it("debería fallar si esperamos un resultado incorrecto", function () {
        calc.addNumber("2");
        calc.setOperation("+");
        calc.addNumber("2");
        calc.calculate();
        expect(calc.getDisplay()).toBe("5"); // intencionalmente mal
    });

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

    describe("Características Avanzadas de Jasmine (Demo)", function () {

        // 1. Matchers para precisión decimal
        it("debería manejar precisión decimal con toBeCloseTo", function () {
            calc.addNumber("0.1");
            calc.setOperation("+");
            calc.addNumber("0.2");
            calc.calculate();

            // 0.1 + 0.2 = 0.30000000000000004
            // expect(parseFloat(calc.getDisplay())).toBe(0.3); // Esto fallaría
            expect(parseFloat(calc.getDisplay())).toBeCloseTo(0.3, 2); // Esto pasa
        });

        // 2. Spies (Espías) para verificar llamadas internas
        it("debería llamar a calculate() implícitamente al encadenar operaciones", function () {
            // Espiamos el método 'calculate' de nuestra instancia
            spyOn(calc, 'calculate').and.callThrough();

            calc.addNumber("5");
            calc.setOperation("+");
            calc.addNumber("5");

            // Al establecer una segunda operación, se debería calcular la primera
            calc.setOperation("-");

            // Verificamos que el espía haya sido llamado
            expect(calc.calculate).toHaveBeenCalled();
            expect(calc.getDisplay()).toBe("10");
        });

        // 3. Matchers de tipo y asimétricos
        it("debería devolver siempre un string en getDisplay", function () {
            calc.addNumber("10");
            // Verificamos que sea cualquier tipo de String, sin importar el valor exacto
            expect(calc.getDisplay()).toEqual(jasmine.any(String));
        });

        // 4. Manejo de excepciones (si tuviéramos validaciones estrictas)
        it("debería demostrar el uso de toThrow (ejemplo teórico)", function () {
            const funcionQueFalla = function () {
                throw new Error("Operación ilegal");
            };
            expect(funcionQueFalla).toThrowError("Operación ilegal");
        });
    });

    // --- SECCIÓN PARA DEMO EN VIVO (TDD) ---
    // Descomenta esto en tu presentación para mostrar cómo falla (RED)
    // y luego implementa el método sqrt() en calculator.js para que pase (GREEN).

    /*
    describe("Nuevas Funcionalidades (TDD)", function() {
        it("debería calcular la raíz cuadrada correctamente", function() {
            calc.addNumber("9");
            calc.sqrt(); // Este método aún no existe
            expect(calc.getDisplay()).toBe("3");
        });

        it("debería dar error al calcular raíz de número negativo", function() {
            calc.addNumber("-4");
            calc.sqrt();
            expect(calc.getDisplay()).toBe("Error");
        });
    });
    */
});

