// ****************************************************************************************************************+
// Calculo de la declaracion anual.
// Clase para ingresos
class Ingreso {
    constructor(id, concepto, mes, monto) {
        this.id = id;
        this.concepto = concepto;
        this.mes = mes;
        this.monto = monto;

    }
}
// Clase para gasto deducible
class GastoDeducible {
    constructor(id, concepto, mes, monto) {
        this.id = id;
        this.concepto = concepto;
        this.mes = mes;
        this.monto = monto;
    }
}
// *************************************************************************************************
// Obtener listas desde Local Storage
// Refactorizacion a OR
const obtenerGastosLS = () => {
    // let existeEnLS = localStorage.getItem("gastos");
    // if (existeEnLS) {
    //     return JSON.parse(localStorage.getItem("gastos"));
    // }
    // else {
    //     return [];
    // }
    return JSON.parse(localStorage.getItem("gastos")) || [];
}
const obtenerIngresosLS = () => {
    // let existeEnLS = localStorage.getItem("ingresos");
    // if (existeEnLS) {
    //     return JSON.parse(localStorage.getItem("ingresos"));
    // }
    // else {
    //     return [];
    // }
    return JSON.parse(localStorage.getItem("ingresos")) || [];
}

// Escribir en LS
const guardarGastosLS = (arrayGastos) => {
    localStorage.setItem("gastos", JSON.stringify(arrayGastos));
}
const guardarIngresosLS = (arrayIngresos) => {
    localStorage.setItem("ingresos", JSON.stringify(arrayIngresos));
}


// Se inicializan las listas de conceptos
const gastos = obtenerGastosLS();
const ingresos = obtenerIngresosLS();

// Funciones para eliminar concepto con click
const eliminarGasto = (arrayGastos, id) => {
    let nuevosGastos = arrayGastos.filter(gasto => gasto.id != id);
    renderGastos(nuevosGastos);
    guardarGastosLS(nuevosGastos);
    arrayGastos = obtenerGastosLS();
}
const eliminarIngreso = (arrayIngresos, id) => {
    let nuevosIngresos = arrayIngresos.filter(ingreso => ingreso.id != id);
    renderIngresos(nuevosIngresos);
    guardarIngresosLS(nuevosIngresos);
    arrayIngresos = obtenerIngresosLS();
}

// Renderizar listas en el DOM
const renderGastos = (arrayGastos) => {
    const contenedorGastos = document.getElementById("gastos");
    contenedorGastos.innerHTML = "";
    let isEmpty = arrayGastos.length == 0;
    if (isEmpty) {
        contenedorGastos.innerHTML = "<p>Agrega gastos.</p>"
    }
    else {
        arrayGastos.forEach(gasto => {
            let cardGasto = document.createElement("div");
            cardGasto.addEventListener("click", () => { eliminarGasto(arrayGastos, gasto.id) });
            cardGasto.className = "card cardGasto";
            cardGasto.innerHTML = `<div class="card-body">
              <h5 class="card-title">${gasto.concepto}</h5>
              <h6 class="card-subtitle mb-2 text-muted">${gasto.mes}</h6>
              <p class="card-text">$${gasto.monto.toLocaleString('en-Latn-US')}.</p>
            </div>`
            contenedorGastos.append(cardGasto);
        })
    }
}
const renderIngresos = (arrayIngresos) => {
    const contenedorIngresos = document.getElementById("ingresos");
    contenedorIngresos.innerHTML = "";
    let isEmpty = arrayIngresos.length == 0;
    if (isEmpty) {
        contenedorIngresos.innerHTML = "<p>Agrega ingresos.</p>"
    }
    else {
        arrayIngresos.forEach(ingreso => {
            let cardIngreso = document.createElement("div");
            cardIngreso.addEventListener("click", () => { eliminarIngreso(arrayIngresos, ingreso.id) });
            cardIngreso.className = "card cardIngreso";
            cardIngreso.innerHTML = `<div class="card-body">
              <h5 class="card-title">${ingreso.concepto}</h5>
              <h6 class="card-subtitle mb-2 text-muted">${ingreso.mes}</h6>
              <p class="card-text">$${ingreso.monto.toLocaleString('en-Latn-US')}.</p>
            </div>`
            contenedorIngresos.append(cardIngreso);
        })
    }
}

renderGastos(gastos);
renderIngresos(ingresos);

// Para el registro, se usara Date.now() para tener un id unico.
// Registrar gastos deducibles
const registrarGastoDeducible = (arrayGastos, concepto, mes, monto) => {
    let gasto = new GastoDeducible(Date.now(), concepto, mes, monto);
    arrayGastos.push(gasto);
}
// Registrar ingresos
const registrarIngreso = (arrayIngresos, concepto, mes, monto) => {
    let ingreso = new Ingreso(Date.now(), concepto, mes, monto);
    arrayIngresos.push(ingreso);
}

// *************************************************************************
// Interaccion con DOM

// Inputs
const selectConcepto = document.getElementById("inputTipo");
const inputConcepto = document.getElementById("inputConcepto");
const selectMes = document.getElementById("inputMes");
const inputMonto = document.getElementById("inputMonto");

// Boolean para validacion
let conceptoCorrecto = false;
let montoCorrecto = false;

// Boton
const botonAgregar = document.getElementById("botonAgregarConcepto");

const validacionFormDeclaracion = () => {
    return conceptoCorrecto && montoCorrecto;
}

// Validaciones de inputs
const validacionConcepto = (e) => {
    let isValid = e.target.value.trim() != "";
    if (isValid) {
        e.target.className = "form-control campoTexto";
        conceptoCorrecto = true;
        limpiarAlerta();
    }
    else {
        e.target.className = "form-control campoTexto invalido";
        conceptoCorrecto = false;
        crearAlerta("Ingresar un concepto valido!");

    }
    let isValidForm = validacionFormDeclaracion();
    habilitarBoton(isValidForm, botonAgregar);
    renderValidacionInput(e.target, isValid);


}

const validacionMonto = (e) => {
    let mayorCero = e.target.value > 0;
    if (mayorCero) {
        e.target.className = "form-control campoTexto";
        montoCorrecto = true;
        limpiarAlerta();
    }
    else {
        e.target.className = "form-control campoTexto invalido";
        montoCorrecto = false;
        crearAlerta("Ingresar un monto valido!");

    }
    let isValid = validacionFormDeclaracion();
    habilitarBoton(isValid, botonAgregar);
    renderValidacionInput(e.target, mayorCero);

}

// Agregar los event listeners

inputConcepto.addEventListener("blur", validacionConcepto);
inputMonto.addEventListener("blur", validacionMonto);


// Handler para el submit de agregar conceptos
const handlerAgregarConcepto = (e) => {
    e.preventDefault();
    let isGasto = valorInputText(selectConcepto) === "gastoDeducible";
    if (isGasto) {
        registrarGastoDeducible(gastos, valorInputText(inputConcepto), valorInputText(selectMes), valorInput(inputMonto));
        guardarGastosLS(gastos);
        renderGastos(gastos);
    }
    else {
        registrarGastoDeducible(ingresos, valorInputText(inputConcepto), valorInputText(selectMes), valorInput(inputMonto));
        guardarIngresosLS(ingresos);
        renderIngresos(ingresos);
    }
    e.target.reset();
    botonAgregar.setAttribute("disabled", "");
    conceptoCorrecto = false;
    montoCorrecto = false;
}

const formConcepto = document.getElementById("formConcepto");
formConcepto.addEventListener("submit", handlerAgregarConcepto);

// Calculo de la declaracion anual
// Obtener la diferencia para determinar si es necesario realizar el pago de ISR
const compararAcumulados = () => {
    const arrayGastos = obtenerGastosLS();
    const arrayIngresos = obtenerIngresosLS();
    const acumuladoIngresos = arrayIngresos.reduce((acumulado, ingreso) => acumulado + ingreso.monto, 0);
    const acumuladoGastos = arrayGastos.reduce((acumulado, gasto) => acumulado + gasto.monto, 0);
    const diferencia = Math.abs(acumuladoIngresos - acumuladoGastos);
    return { acumuladoIngresos: acumuladoIngresos, acumuladoGastos: acumuladoGastos, diferencia: diferencia };
}

// Reporte de resultados
const reportarResultados = (contenedor, resultado) => {
    let card = `<div class="card">
    <div class="card-body">
      <h5 class="card-title">Resultado</h5>
      <p class="card-text">Considerando la totalidad de los conceptos registrados: </p>
      <p class="card-text">Con un acumulado de ingresos de $${resultado.acumuladoIngresos.toLocaleString('en-Latn-US')}</p>
      <p class="card-text">Un acumulado de gastos deducibles de $${resultado.acumuladoGastos.toLocaleString('en-Latn-US')}</p>
      <p class="card-text">Una diferencia de $${resultado.diferencia.toLocaleString('en-Latn-US')}</p>
    </div>
  </div>`;
    contenedor.innerHTML = card;
}

const resultadosDeclaracion = document.getElementById("resultadosDeclaracion");

const handlerDeclarar = (e) => {
    e.preventDefault();
    const resultado = compararAcumulados(ingresos, gastos);
    reportarResultados(resultadosDeclaracion, resultado);
}

const formDeclaracion = document.getElementById("formDeclaracionAnual");
formDeclaracion.addEventListener("submit", handlerDeclarar);

// Opciones de filtrado de conceptos

// Select del filtro
const selectFiltro = document.getElementById("inputFiltroMes");
// Funcion de filtrado
const filtrarConceptos = (arrayGastos, arrayIngresos, mes) => {
    let nuevosGastos;
    let nuevosIngresos;
    if (mes === "sinFiltro") {
        nuevosGastos = obtenerGastosLS();
        nuevosIngresos = obtenerIngresosLS();
    }
    else {
        nuevosGastos = arrayGastos.filter(gasto => gasto.mes === mes);
        nuevosIngresos = arrayIngresos.filter(ingreso => ingreso.mes === mes);
    }
    renderGastos(nuevosGastos);
    renderIngresos(nuevosIngresos);
}

// Evento
selectFiltro.addEventListener("change", () => filtrarConceptos(gastos, ingresos, valorInputText(selectFiltro)));
