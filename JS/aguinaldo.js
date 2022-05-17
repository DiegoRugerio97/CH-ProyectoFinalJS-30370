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
    if (anioCumplido) {
        return salarioAguinaldoCorrecto && diasCorrecto;
    }
    else {
        return salarioAguinaldoCorrecto && diasCorrecto && diasTrabajadosCorrecto;
    }
}
// Handlers para cada input
const validacionSalarioAguinaldo = (e) => {
    if (e.target.value <= 0) {
        e.target.className = "form-control campoTexto invalido";
        salarioAguinaldoCorrecto = false;
        crearAlerta();
    }
    else {
        e.target.className = "form-control campoTexto";
        salarioAguinaldoCorrecto = true;
        limpiarAlerta();
    }
    if (validacionFormAguinaldo()) {
        botonAguinaldo.removeAttribute("disabled");
    }
    else {
        botonAguinaldo.setAttribute("disabled", "");
    }
}
const validacionDias = (e) => {
    if (e.target.value < 15) {
        e.target.className = "form-control campoTexto invalido";
        diasCorrecto = false;
        crearAlerta();
    }
    else {
        e.target.className = "form-control campoTexto";
        diasCorrecto = true;
        limpiarAlerta();
    }
    if (validacionFormAguinaldo()) {
        botonAguinaldo.removeAttribute("disabled");
    }
    else {
        botonAguinaldo.setAttribute("disabled", "");
    }
}
const validacionDiasTrabajados = (e) => {
    if (e.target.value <= 0) {
        e.target.className = "form-control campoTexto invalido";
        diasTrabajadosCorrecto = false;
        crearAlerta();
    }
    else {
        e.target.className = "form-control campoTexto";
        diasTrabajadosCorrecto = true;
        limpiarAlerta();
    }
    if (validacionFormAguinaldo()) {
        botonAguinaldo.removeAttribute("disabled");
    }
    else {
        botonAguinaldo.setAttribute("disabled", "");
    }
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

