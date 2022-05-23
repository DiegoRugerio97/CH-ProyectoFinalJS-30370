// ***********************************************************************************************************************
// ISR
// Constantes para calculo de retencion de impuestos
// Clase limite
class limite {
    constructor(id, limiteInferior, limiteSuperior, cuotaFija, porcentaje) {
        this.limiteInferior = limiteInferior;
        this.limiteSuperior = limiteSuperior;
        this.cuotaFija = cuotaFija;
        this.porcentaje = porcentaje;
        this.id = id;
        this.retencion;
    }
    calcularRetencion(salarioMensual) {
        this.retencion = Math.round(((salarioMensual - this.limiteInferior) * this.porcentaje) + this.cuotaFija);
    }
}
// Array de objetos limite
// No tiene sentido guardarlos en LS
// Se guardaran en algun server para ser fetcheados
const LIMITES_ISR = [new limite(0, 0, 644.58, 0, .0192),
new limite(1, 644.58, 5470.92, 12.38, 0.064),
new limite(2, 5470.92, 9614.66, 321.26, 0.1088),
new limite(3, 9614.66, 11176.62, 772.1, 0.16),
new limite(4, 11176.62, 13381.47, 1022.01, 0.1792),
new limite(5, 13381.47, 26988.5, 1417.12, 0.2136),
new limite(6, 26988.5, 42537.58, 4323.58, 0.2352),
new limite(7, 42537.58, 81211.25, 7980.73, 0.3),
new limite(8, 81211.25, 108281.67, 19582.83, 0.32),
new limite(9, 108281.67, 324845.01, 28245.36, 0.34),
new limite(10, 324845.01, 10000000, 101876.9, 0.35)];

// Creacion de la tabla de limites
const crearTablaLimites = (arrayLimites) => {
    let tableBody = document.getElementById("tableBodySegmentos");
    arrayLimites.forEach((limite) => {
        let tableRow = document.createElement("tr");
        tableRow.id = `limite${limite.id}`;
        let contenidoRow = `<td>$ ${limite.limiteInferior.toLocaleString('en-Latn-US')}</td>
        <td>$ ${limite.limiteSuperior.toLocaleString('en-Latn-US')}</td>
        <td>$ ${limite.cuotaFija.toLocaleString('en-Latn-US')}</td>
        <td>${(limite.porcentaje * 100).toFixed(2)}%</td>`;
        tableRow.innerHTML = contenidoRow;
        tableBody.append(tableRow);
    });
}
// Se ejecuta funcion con info de los LIMITES_ISR
crearTablaLimites(LIMITES_ISR);

// Input
const inputSalarioMensual = document.getElementById("inputSalarioISR");
// Boolean para validacion
let salarioMensualCorrecto = false;
// Boton
const botonISR = document.getElementById("botonISR");
// Validacion del input
const validacionSalarioISR = (e) => {
    let mayorCero = e.target.value > 0;
    if (mayorCero) {
        salarioMensualCorrecto = true;
        limpiarAlerta();
    }
    else {
        salarioMensualCorrecto = false;
        crearAlerta();
        renderError("Ingresar un salario valido!");
    }
    habilitarBoton(mayorCero,botonISR);
    renderValidacionInput(e.target,mayorCero);

}
// Se agrega el event listener al input
inputSalarioMensual.addEventListener("blur", validacionSalarioISR);

// Contenedor de Resultados de la retencion
const resultadosISR = document.getElementById("resultadosISR");

// Logica refactorizada del calculo del ISR
const calcularISR = (salarioMensual) => {
    // Calculo de la retencion del ISR sobre el salario, basado en los limites establecidos por la ley federal del trabajo mexicana.
    // Variable para guardar el objeto limite despues de segmentar el salario
    let limiteAsignado;
    // Implementacion de logica de segmentado utilizando un array de objetos limite.
    limiteAsignado = LIMITES_ISR.find((lim) => { return salarioMensual > lim.limiteInferior && salarioMensual <= lim.limiteSuperior });
    // Metodo para el calculo de la retencion.
    limiteAsignado.calcularRetencion(salarioMensual);
    return limiteAsignado;
}

// Se limpia la clase del segmento asignado
const resetSegmentos = () => {
    LIMITES_ISR.forEach(limite => {
        let segmento = document.getElementById(`limite${limite.id}`);
        segmento.className = "";
    })
}

// Se le asigna la clase al segmento asignado
const seleccionarSegmento = (id) => {
    resetSegmentos();
    const segmentoSeleccionado = document.getElementById(`limite${id}`);
    segmentoSeleccionado.className = "segSelec";
}

// Handler para el submit
const ISRHandler = (e) => {
    e.preventDefault();
    // Variable para guardar el salario mensual del usuario
    const salarioMensual = valorInput(inputSalarioMensual);
    // OBJ ISR
    const ISR = calcularISR(salarioMensual);
    // Se le pasa el id para seleccionar el segmento
    seleccionarSegmento(ISR.id);
    resultadosISR.innerHTML = `<div class="card">
    <div class="card-body">
      <h5 class="card-title">Resultado</h5>
      <p class="card-text">Con un salario mensual de: $${salarioMensual.toLocaleString('en-Latn-US')} (MXN).</p>
      <p class="card-text">La retención del ISR según la ley federal del trabajo es de: $${ISR.retencion.toLocaleString('en-Latn-US')} (MXN).</p>
      <p class="card-text">Resultando en un ingreso neto de: $${(salarioMensual - ISR.retencion).toLocaleString('en-Latn-US')} (MXN).</p>
    </div>
  </div>`;
    e.target.reset();
}
// Se asigna el event listener
const formISR = document.getElementById("formISR");
formISR.addEventListener("submit", ISRHandler);
