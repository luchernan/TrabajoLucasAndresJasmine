# Guía de Instalación y Configuración (Paso a Paso)

Para inicializarlo e instalarlo en un proyecto nuevo:

```bash
npm init -y
npm install --save-dev jasmine
npx jasmine init
```

**(Modifica `spec/support/jasmine.json` o `.mjs`)**

```json
// spec/support/jasmine.json
{
  "spec_dir": "spec", // o "tests" si cambiaste la carpeta
  "spec_files": [
    "**/*[sS]pec.js" // ¡Asegúrate que termina en .js!
  ],
  // ... (el resto del archivo es igual)
}
```

Para ejecutar:
```bash
npm test
```

---

## EXPLICACIÓN DETALLADA

### 1. `npm init -y`
*   **¿Qué es npm?** Es el Node Package Manager, la herramienta estándar para gestionar librerías de JavaScript.
*   **¿Qué hace el comando?** Crea el archivo `package.json` en el directorio raíz de tu proyecto.
*   **¿Por qué `-y`?** El flag `-y` (yes) acepta todas las configuraciones por defecto sin preguntarte detalles como el nombre del proyecto o la descripción, acelerando la inicialización.
*   **Propósito:** Este archivo es esencial. Actúa como el manifiesto de tu proyecto: rastrea todas las dependencias (librerías que usas, como Jasmine) y define los scripts de ejecución (como `npm test`).

### 2. `npm install --save-dev jasmine`
*   **¿Qué hace el comando?** Descarga la librería Jasmine de los repositorios de npm y la instala en una carpeta local llamada `node_modules`.
*   **¿Por qué `--save-dev`?** Este flag indica que Jasmine es una dependencia de desarrollo (`devDependencies`). Significa que la necesitas para crear y testear el código, pero no es necesaria para que el usuario final ejecute tu calculadora en su navegador. Esto mantiene tu proyecto limpio y ligero.
*   **Propósito:** Pone a disposición del proyecto todas las funciones y herramientas de testing de Jasmine.

### 3. `npx jasmine init`
*   **¿Qué es npx?** Es un ejecutor de paquetes de npm. Permite ejecutar herramientas de línea de comandos que están instaladas localmente (en `node_modules`), sin tener que instalarlas globalmente.
*   **¿Qué hace el comando?** Ejecuta la herramienta de inicialización de Jasmine. Crea la estructura de directorios necesaria para los tests:
    *   Crea la carpeta `spec/` (donde irán tus archivos de test, o "specs").
    *   Crea la carpeta `spec/support/`.
    *   Genera el archivo de configuración `jasmine.json`.
*   **Propósito:** Configura el entorno de Jasmine, definiendo dónde buscar los archivos de prueba y cómo ejecutarlos.

### 📝 Ajuste de Configuración (Importante)

#### 4. Modificar `jasmine.json`
| Antes | Después | Razón |
| :--- | :--- | :--- |
| `"**/*[sS]pec.mjs"` | `"**/*[sS]pec.js"` | Compatibilidad con Node.js y tu código. |

*   **El problema:** Por defecto, las versiones modernas de Jasmine (y Node.js) asumen que estás usando la sintaxis de Módulos ES (`import/export`), que suelen tener la extensión `.mjs`.
*   **La solución:** Tu código JavaScript utiliza la sintaxis de CommonJS (`require/module.exports`). Al cambiar la extensión a `.js`, le estás diciendo a Jasmine: *"Busca y ejecuta los archivos de prueba usando el sistema de módulos tradicional de Node.js."*
*   **Propósito:** Asegura que Jasmine cargue tu clase `Calculator` correctamente y ejecute los tests sin errores de sintaxis de módulos.

### 🏃 Ejecución de los Tests

#### 5. `npm test`
*   **¿Qué hace el comando?** Consulta el archivo `package.json` y busca el script definido bajo el nombre `"test"`.
*   **Contexto:** Previamente, se define el script como `"test": "jasmine"`.
*   **Ejecución:** Al escribir `npm test`, se ejecuta internamente el comando `jasmine`. Jasmine lee el archivo `jasmine.json`, busca todos los archivos que coincidan con el patrón `*Spec.js` dentro de la carpeta `spec/`, los ejecuta, y te muestra el resultado en la consola.
*   **Propósito:** Es la manera estándar y rápida de ejecutar tu suite de pruebas.

---


## Introducción a Jasmine para Pruebas Unitarias

### 1. ¿Qué es Jasmine?
*   Es un framework para probar código JavaScript (BDD - Behavior Driven Development).
*   **En nuestro proyecto:** Lo usamos para asegurar que la clase `Calculator` funcione perfecto antes de que el usuario la use.
*   **Ventaja:** No necesitamos instalar nada extra para empezar, ya viene con todo (aserciones, espías).

---

### 2. Estructura del Proyecto
Para que Jasmine funcione correctamente, hemos organizado el proyecto de la siguiente manera:

*   **`calculator.js`**: El corazón de la app. Contiene la lógica de negocio (la clase `Calculator`). Es el código que queremos probar.
*   **`tests/calculatorSpec.js`**: Aquí viven nuestras pruebas. Describe cómo *debería* comportarse la calculadora.
*   **`tests/SpecRunner.html`**: El "tablero de control". Es un archivo HTML que carga Jasmine, nuestro código y los tests, y muestra los resultados visualmente en el navegador.
*   **`lib/jasmine-.../`**: Contiene el núcleo de Jasmine (el motor que ejecuta las pruebas).
*   **`spec/support/jasmine.mjs`**: Configuración para ejecutar los tests desde la terminal con Node.js.

---

### 3. Estructura Real de una Prueba
En nuestro archivo `tests/calculatorSpec.js`, vemos cómo se organiza una prueba:

```javascript
// tests/calculatorSpec.js

// 1. DESCRIBE: Agrupa todas las pruebas de la Calculadora
describe("Calculadora", function () {
    
    // 2. IT: Define una prueba específica (una "especificación")
    it("debería realizar sumas correctamente", function () {
        calc.addNumber("5");
        calc.setOperation("+");
        calc.addNumber("3");
        calc.calculate();
        
        // 3. EXPECT: La validación. Si esto no se cumple, el test falla.
        expect(calc.getDisplay()).toBe("8");
    });
});
```

---

### 4. El Ciclo de Vida (Setup)
Para evitar repetir código y errores, usamos `beforeEach`.
**En nuestro código:**
```javascript
let calc;

// Se ejecuta ANTES de cada 'it'. 
// Nos da una calculadora "nueva" y limpia para cada prueba.
beforeEach(function () {
    calc = new Calculator();
});
```
*Esto evita que una suma en el test 1 afecte a una resta en el test 2.*

---

### 5. Matchers (Validaciones) que Usamos
Jasmine tiene muchas formas de validar. Ejemplos reales de nuestro proyecto:

*   **`toBe()`**: Igualdad exacta.
    ```javascript
    expect(calc.getDisplay()).toBe("42"); // Para verificar resultados exactos
    ```

*   **`toBeLessThanOrEqual()`**: Comparación numérica.
    ```javascript
    // En el test de división por cero:
    expect(Number(calc.getDisplay())).toBeLessThanOrEqual(0);
    ```

*   **`toBeCloseTo()`**: **Crucial para decimales**.
    *   *Problema:* En JS, `0.1 + 0.2` es `0.30000000000000004`.
    *   *Solución en nuestro test:*
    ```javascript
    // Verificamos que sea 0.3 con 2 decimales de precisión
    expect(parseFloat(calc.getDisplay())).toBeCloseTo(0.3, 2);
    ```

---

### 6. Espías (Spies): Verificando el Comportamiento Interno
A veces no basta con ver el resultado final, queremos saber si una función interna se llamó.

**Ejemplo en `calculatorSpec.js`:**
Queremos asegurar que al encadenar operaciones (ej: `5 + 5 -`), la calculadora resuelva la primera suma automáticamente.

```javascript
it("debería llamar a calculate() implícitamente...", function() {
    // 1. Ponemos un "espía" en el método calculate
    spyOn(calc, 'calculate').and.callThrough();

    calc.addNumber("5");
    calc.setOperation("+");
    calc.addNumber("5");
    
    // 2. Al poner otra operación, debería disparar el cálculo anterior
    calc.setOperation("-"); 

    // 3. Preguntamos al espía: "¿Te llamaron?"
    expect(calc.calculate).toHaveBeenCalled();
});
```

---

### 7. Ejecución de las Pruebas
Nuestro proyecto soporta dos formas de correr estos tests:

1.  **Visual (Navegador):** Abriendo `tests/SpecRunner.html`.
    *   *Ventaja:* Vemos barras verdes/rojas y es fácil de depurar con F12.
2.  **Consola (Node.js):** Ejecutando `npm test`.
    *   *Ventaja:* Rápido y profesional, ideal para integración continua.
    *   *Nota:* Tuvimos que adaptar `calculator.js` con `module.exports` para que esto funcionara.

---

### Conclusión
Gracias a estos tests en Jasmine, podemos refactorizar o mejorar la calculadora con la seguridad de que si rompemos algo (como la suma o la división), Jasmine nos avisará inmediatamente con una barra roja.
