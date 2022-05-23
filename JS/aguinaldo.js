// Calculo de Aguinaldo del trabajador
// ****************************************************************************************************************
// Inputs
const inputSalarioAguinaldo = document.getElementById("inputSalarioAg");
const inputDias = document.getElementById("inputDias");
const inputDiasTrabajados = document.getElementById("inputDiasTrabajados");
// Booleanas para validacion
let salarioAguinaldoCorrecto = false;
let diasCorrecto = false;
let diasTrabajadosCorrecto = false;
// Booleanos para guardar estado de input touched/untouched
// let salarioTouched = false;
// let diasTouched = false;
// let diasTrabajadosTouched = false;

// Boton de calculo aguinaldo
const botonAguinaldo = document.getElementById("botonAguinaldo");

const validacionFormAguinaldo = () => {
    // if (anioCumplido) {
    //     return salarioAguinaldoCorrecto && diasCorrecto;
    // }
    // else {
    //     return salarioAguinaldoCorrecto && diasCorrecto && diasTrabajadosCorrecto;
    // }
    // Refactorizacion a expresion ternaria.
    return anioCumplido ? (salarioAguinaldoCorrecto && diasCorrecto) : (salarioAguinaldoCorrecto && diasCorrecto && diasTrabajadosCorrecto);
}

// Handlers para cada input
const validacionSalarioAguinaldo = (e) => {
    let mayorCero = e.target.value > 0;
    if (mayorCero) {
        salarioAguinaldoCorrecto = true;
        limpiarAlerta();
    }
    else {
        salarioAguinaldoCorrecto = false;
        crearAlerta();
        renderError("Ingresar un salario valido!");
    }
    let isValid = validacionFormAguinaldo();
    habilitarBoton(isValid, botonAguinaldo);
    renderValidacionInput(e.target, mayorCero);
}
const validacionDias = (e) => {
    let mayorQuince = e.target.value >= 15;
    if (mayorQuince) {
        diasCorrecto = true;
        limpiarAlerta();
    }
    else {
        diasCorrecto = false;
        crearAlerta();
        renderError("Ingresar una cantidad de días valida!");
    }
    let isValid = validacionFormAguinaldo();
    habilitarBoton(isValid, botonAguinaldo);
    renderValidacionInput(e.target, mayorQuince);

}
const validacionDiasTrabajados = (e) => {
    let mayorCero = e.target.value > 0;
    if (mayorCero) {
        diasTrabajadosCorrecto = true;
        limpiarAlerta();
    }
    else {
        diasTrabajadosCorrecto = false;
        crearAlerta();
        renderError("Ingresar una cantidad de días valida!");
    }
    let isValid = validacionFormAguinaldo();
    habilitarBoton(isValid, botonAguinaldo);
    renderValidacionInput(e.target, mayorCero);

}
// Asignacion de event listeners
inputSalarioAguinaldo.addEventListener("blur", validacionSalarioAguinaldo);
inputDias.addEventListener("blur", validacionDias);
inputDiasTrabajados.addEventListener("blur", validacionDiasTrabajados);

// //Handlers touched para cada input
// const touchedSalario = () => {
//     salarioTouched = true;
// }
// const touchedDias = () => {
//     diasTouched = true;
// }
// const touchedDiasTrabajados = () => {
//     diasTrabajadosTouched = true;
// }
// Asignacion de event listeners
// inputSalarioAguinaldo.addEventListener("blur", touchedSalario);
// inputDias.addEventListener("blur", touchedDias);
// inputDiasTrabajados.addEventListener("blur", touchedDiasTrabajados);

// Input Extra del form para los dias trabajados en caso de no haber cumplido el año
let anioCumplido = true;
const inputExtra = document.getElementById("formDiasTrabajados");
const radioDiasTrabajadosNo = document.getElementById("inputRadioNo");
const radioDiasTrabajadosSi = document.getElementById("inputRadioSi");
radioDiasTrabajadosNo.addEventListener("click", () => {
    inputExtra.className = "form-row";
    anioCumplido = false;
    botonAguinaldo.setAttribute("disabled", "");
    inputDiasTrabajados.value = "";
});
radioDiasTrabajadosSi.addEventListener("click", () => {
    inputExtra.className = "form-row hidden";
    anioCumplido = true;
});

// Constantes
const DIAS_MES = 30.5;
const DIAS_ANIO = 365;

// Logica del calculo de aguinaldo refactorizada
const calcularAguinaldo = () => {
    // Si se ha trabajado minimo un año en la empresa
    // aguinaldo = salario diario * dias de aguinaldo (por ley en Mexico son 15 minimos, hay empresas que dan mas como prestacion)
    // Si no, se calculan los dias proporcionales basado en los dias trabajados.
    let salarioDiario = valorInput(inputSalarioAguinaldo) / DIAS_MES;
    if (anioCumplido) {
        return Math.round(valorInput(inputDias) * salarioDiario);
    }
    else {
        let diasProporcionales = (valorInput(inputDiasTrabajados) * valorInput(inputDias)) / DIAS_ANIO;
        return Math.round(diasProporcionales * salarioDiario);
    }
}

// Resultados del aguinaldo
const resultadosAguinaldo = document.getElementById("resultadosAguinaldo");

// Handler para el submit
const aguinaldoHandler = (e) => {
    e.preventDefault();
    resultadosAguinaldo.innerHTML = `<div class="card">
    <div class="card-body">
      <h5 class="card-title">Resultado</h5>
      <p class="card-text">Te corresponde un aguinaldo de $${calcularAguinaldo().toLocaleString('en-Latn-US')}</p>
    </div>
  </div>`;
    // e.target.reset();
}
// Se asigna el event listener
const formAguinaldo = document.getElementById("calcularAguinaldo");
formAguinaldo.addEventListener("submit", aguinaldoHandler);

