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
// Optimizacion
const obtenerConceptosLS = (tipo) => {
    return JSON.parse(localStorage.getItem(tipo)) || [];
}
// Escribir en LS
// Optimizacion
const guardarConceptoLS = (tipo, array) => {
    localStorage.setItem(tipo, JSON.stringify(array));
}

// Se inicializan las listas de conceptos
const gastos = obtenerConceptosLS("gastos");
const ingresos = obtenerConceptosLS("ingresos");

// Funciones para eliminar concepto con click
// Optimizacion
const eliminarConcepto = (tipo, array, id) => {
    let nuevoArray = array.filter(elem => elem.id != id);
    renderConceptos(tipo, nuevoArray);
    guardarConceptoLS(tipo, nuevoArray);
    array = obtenerConceptosLS(tipo);

}

// Renderizar listas en el DOM
// Optimizacion
const renderConceptos = (tipo, array) => {
    const contenedor = document.getElementById(tipo);
    contenedor.innerHTML = "";
    let isEmpty = array.length == 0;
    if (isEmpty) {
        contenedor.innerHTML = `<p>Agrega ${tipo}.</p>`
    }
    else {
        array.forEach(elem => {
            let card = document.createElement("div");
            let isGasto = tipo == "gastos";
            card.addEventListener("click", () => { isGasto ? eliminarConcepto("gastos", array, elem.id) : eliminarConcepto("ingresos", array, elem.id) });
            card.className = isGasto ? "card cardGasto" : "card cardIngreso";
            card.innerHTML = `<div class="card-body">
            <h5 class="card-title">${elem.concepto}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${elem.mes}</h6>
            <p class="card-text">$${elem.monto.toLocaleString('en-Latn-US')}.</p>
            </div>`
            contenedor.append(card);
        })
    }
}

renderConceptos("gastos", gastos);
renderConceptos("ingresos", ingresos);

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
        guardarConceptoLS("gastos", gastos);
    }
    else {
        registrarGastoDeducible(ingresos, valorInputText(inputConcepto), valorInputText(selectMes), valorInput(inputMonto));
        guardarConceptoLS("ingresos", ingresos);
    }
    e.target.reset();
    botonAgregar.setAttribute("disabled", "");
    conceptoCorrecto = false;
    montoCorrecto = false;
    selectFiltro.value = "sinFiltro";
    renderConceptos("gastos", gastos);
    renderConceptos("ingresos", ingresos);

}

const formConcepto = document.getElementById("formConcepto");
formConcepto.addEventListener("submit", handlerAgregarConcepto);

// Calculo de la declaracion anual
// Obtener la diferencia para determinar si es necesario realizar el pago de ISR
const compararAcumulados = () => {
    const arrayGastos = obtenerConceptosLS("gastos");
    const arrayIngresos = obtenerConceptosLS("ingresos");
    const acumuladoIngresos = arrayIngresos.reduce((acumulado, ingreso) => acumulado + ingreso.monto, 0);
    const acumuladoGastos = arrayGastos.reduce((acumulado, gasto) => acumulado + gasto.monto, 0);
    const diferencia = Math.abs(acumuladoIngresos - acumuladoGastos);
    return { acumuladoIngresos: acumuladoIngresos, acumuladoGastos: acumuladoGastos, diferencia: diferencia, saldoFavor: acumuladoGastos > acumuladoIngresos };
}

// Reporte de resultados
const reportarResultados = (contenedor, resultado) => {
    let parrafoResultado = document.createElement("p");
    if (resultado.saldoFavor) {
        parrafoResultado.innerHTML = `Tienes un saldo fiscal a favor de $${resultado.diferencia.toLocaleString('en-Latn-US')} (MXN)`;
    }
    else {
        parrafoResultado.innerHTML = `Tienes un saldo fiscal en contra de $${resultado.diferencia.toLocaleString('en-Latn-US')} (MXN)`;
    }

    let card = `<div class="card">
    <div id = "cardResultado" class="card-body">
    <h5 class="card-title">Resultado</h5>
    <p class="card-text">Considerando la totalidad de los conceptos registrados: </p>
    <p class="card-text">Con un acumulado de ingresos de $${resultado.acumuladoIngresos.toLocaleString('en-Latn-US')} (MXN).</p>
    <p class="card-text">Un acumulado de deducciones de $${resultado.acumuladoGastos.toLocaleString('en-Latn-US')} (MXN).</p>
    </div>
</div>`;
    contenedor.innerHTML = card;
    const cardResultado = document.getElementById("cardResultado");
    cardResultado.appendChild(parrafoResultado);
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
        nuevosGastos = obtenerConceptosLS("gastos");
        nuevosIngresos = obtenerConceptosLS("ingresos");
    }
    else {
        nuevosGastos = arrayGastos.filter(gasto => gasto.mes === mes);
        nuevosIngresos = arrayIngresos.filter(ingreso => ingreso.mes === mes);
    }
    renderConceptos("gastos", nuevosGastos);
    renderConceptos("ingresos", nuevosIngresos);

}

// Evento
selectFiltro.addEventListener("change", () => filtrarConceptos(gastos, ingresos, valorInputText(selectFiltro)));
