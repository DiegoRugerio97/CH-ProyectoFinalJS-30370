
// Implementacion de FETCH
// Segmentos se guardan en una db de Firebase.
// Se agrega el .json, especifico de Firebase
const dbSegmentos = "https://ac-empresarial-db-default-rtdb.firebaseio.com/segmentos.json";
const LIMITES_ISR = [];
fetch(dbSegmentos).then(response => response.json())
    .then(data => {
        data.forEach(segmento => LIMITES_ISR.push(new Limite(
            segmento.id,
            segmento.limiteInferior,
            segmento.limiteSuperior,
            segmento.cuotaFija,
            segmento.porcentaje)))
    })
    .then( () => crearTablaLimites(LIMITES_ISR));

// ***********************************************************************************************************************
// ISR
// Constantes para calculo de retencion de impuestos
// Clase limite
class Limite {
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
        crearAlerta("Ingresar un salario valido!");
    }
    habilitarBoton(mayorCero, botonISR);
    renderValidacionInput(e.target, mayorCero);

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
