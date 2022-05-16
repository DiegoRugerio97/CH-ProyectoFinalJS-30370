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
const obtenerGastosLS = () => {
    let existeEnLS = localStorage.getItem("gastos");
    if (existeEnLS) {
        return JSON.parse(localStorage.getItem("gastos"));
    }
    else {
        return [];
    }
}
const obtenerIngresosLS = () => {
    let existeEnLS = localStorage.getItem("ingresos");
    if (existeEnLS) {
        return JSON.parse(localStorage.getItem("ingresos"));
    }
    else {
        return [];
    }
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
}
const eliminarIngreso = (arrayIngresos, id) => {
    let nuevosIngresos = arrayIngresos.filter(ingreso => ingreso.id != id);
    renderIngresos(nuevosIngresos);
    guardarIngresosLS(nuevosIngresos);
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

// Validaciones de inputs
const validacionConcepto = (e) => {
    let isValid = e.target.value.length > 0;
    if (!isValid) {
        e.target.className = "form-control campoTexto invalido";
        conceptoCorrecto = false;
        botonAgregar.setAttribute("disabled", "");
        crearAlerta();
    }
    else {
        e.target.className = "form-control campoTexto";
        conceptoCorrecto = true;
        botonAgregar.removeAttribute("disabled");
        limpiarAlerta();
    }
}

const validacionMonto = (e) => {
    let isValid = e.target.value > 0;
    if (!isValid) {
        e.target.className = "form-control campoTexto invalido";
        montoCorrecto = false;
        botonAgregar.setAttribute("disabled", "");
        crearAlerta();
    }
    else {
        e.target.className = "form-control campoTexto";
        montoCorrecto = true;
        botonAgregar.removeAttribute("disabled");
        limpiarAlerta();
    }
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
    botonAgregar.setAttribute("disabled","");
}

const formConcepto = document.getElementById("formConcepto");
formConcepto.addEventListener("submit", handlerAgregarConcepto);

// Calculo de la declaracion anual
// Obtener la diferencia para determinar si es necesario realizar el pago de ISR
const compararAcumulados = (arrayIngresos, arrayGastos) => {
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
      <p class="card-text">Con un acumulado de ingresos de $${resultado.acumuladoIngresos}</p>
      <p class="card-text">Un acumulado de gastos deducibles de $${resultado.acumuladoGastos}</p>
      <p class="card-text">Una diferencia de $${resultado.diferencia}</p>
    </div>
  </div>`;
    contenedor.innerHTML = card;
}

const resultadosDeclaracion = document.getElementById("resultadosDeclaracion");

const handlerDeclarar = (e) => {
    e.preventDefault();
    const resultado = compararAcumulados(ingresos,gastos);
    reportarResultados(resultadosDeclaracion, resultado);
}

const formDeclaracion = document.getElementById("formDeclaracionAnual");
formDeclaracion.addEventListener("submit", handlerDeclarar);