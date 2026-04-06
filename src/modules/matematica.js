/* Este es el módulo "matematicas" */
const multiplicar = (a, b) => {
  return a * b;
};

const restar = (a, b) => {
  return a - b;
};

const dividir = (a, b) => {
  return a / b;
};

// Exporto todo lo que yo quiero exponer del módulo hacia el exterior.
export {PI, sumar, multiplicar};