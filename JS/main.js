// Calculadora financiera para Personas Fisicas
// Calculos a implementar

// 23/04/2022
// Calculo de Aguinaldo - IMPLEMENTADO
// Calculo de Retencion de impuestos - IMPLEMENTADO
// Calculo de Vacaciones - CAMBIO A CALCULO DE DECLARACION ANUAL
// Declaracion Anual 

// *********************************************************************************************************************




// Constantes

const DIAS_MES = 30.5;
const DIAS_ANIO = 365;


// *********************************************************************************************************************
// Funciones de utilidad
// Lectura de prompts, despues sera lectura de campos
// Float
const inputFloat = (mensajePrompt) => {
    while (true) {
        let input = prompt(mensajePrompt);
        if (parseFloat(input)) {
            return parseFloat(input);
        }
        else {
            alert("Por favor, introduce un valor númerico.");
        }
    }
}
// Int
const inputInt = (mensajePrompt) => {
    while (true) {
        let input = prompt(mensajePrompt);
        if (parseInt(input)) {
            return parseInt(input);
        }
        else {
            alert("Por favor, introduce un valor númerico.");
        }
    }
}
// String
const inputString = (mensajePrompt) => {
    while (true) {
        let input = prompt(mensajePrompt);
        if (isNaN(input)) {
            return input;
        }
        else {
            alert("Por favor, introduce un valor valido.");
        }
    }
}

// ****************************************************************************************************************+
// Funcion para el calculo de la declaracion anual.
// Clase para ingresos
class Ingreso {
    constructor(concepto, mes, monto) {
        this.concepto = concepto;
        this.mes = mes;
        this.monto = monto;
    }
}

// Clase para gasto deducible
class GastoDeducible {
    constructor(concepto, mes, monto) {
        this.concepto = concepto;
        this.mes = mes;
        this.monto = monto;
    }
}

// Funciones auxiliares para la declaracion anual
// Registrar gastos deducibles
const registrarGastoDeducible = (arrayGastos) => {
    let gasto = new GastoDeducible(inputString("Concepto del gasto"),
        inputString("Mes donde se realizo el gasto"),
        inputFloat("Monto facturado del gasto deducible"));
    arrayGastos.push(gasto);
}

// Registrar ingresos
const registrarIngreso = (arrayIngreso) => {
    let ingreso = new Ingreso(inputString("Concepto del ingreso"),
        inputString("Mes donde se obtuvo el ingreso"),
        inputFloat("Monto facturado del ingreso"));
    arrayIngreso.push(ingreso);
}

// Reportar las listas
const reportar = (array) => {
    let mensaje = "";
    if (array.length > 0) {
        array.forEach(elem => {
            mensaje += `Concepto: ${elem.concepto} - Mes: ${elem.mes} - Monto: $${elem.monto} \n`;
        });
    }
    else {
        mensaje = "Sin conceptos registrados."
    }
    return mensaje;

}

// Obtener la diferencia para determinar si es necesario realizar el pago de ISR
const compararAcumulados = (arrayIngresos, arrayGastos) => {
    const acumuladoIngresos = arrayIngresos.reduce((acumulado, ingreso) => acumulado + ingreso.monto, 0);
    const acumuladoGastos = arrayGastos.reduce((acumulado, gasto) => acumulado + gasto.monto, 0);
    const diferencia = Math.abs(acumuladoIngresos - acumuladoGastos);
    return { acumuladoIngresos: acumuladoIngresos, acumuladoGastos: acumuladoGastos, diferencia: diferencia };
}

// Reporte de resultados
const reportarResultados = (resultado) => {
    let mensaje = `Con un acumulado de ingresos de $${resultado.acumuladoIngresos}
Un acumulado de gastos deducibles de $${resultado.acumuladoGastos}
Una diferencia de $${resultado.diferencia}`;
    return mensaje;
}

// Funcion unificadora
const construirDeclaracionAnual = (arrayIngresos, arrayGastos) => {
    alert(reportar(arrayIngresos));
    alert(reportar(arrayGastos));
    if (arrayGastos.length > 0 && arrayIngresos.length > 0) {
        let resultado = compararAcumulados(arrayIngresos, arrayGastos);
        alert(reportarResultados(resultado));
    }
    else {
        alert("Favor de registrar ingresos y gastos");
    }


}

const calcularDeclaracionAnual = () => {
    let ingresos = [];
    let gastosDeducibles = [];
    let salir = false;
    let submenu = `
        Declaracion Anual
        Elije una opción para empezar a calcular tu declaración anual.
        Selecciona un tipo de concepto a registrar.
        G - Gasto deducible
        I - Ingreso
        Introduce 'C' para continuar o 'S' para salir.
        `;
    do {
        let opcionSeleccionada = inputString(submenu);
        switch (opcionSeleccionada) {
            case 'G':
                registrarGastoDeducible(gastosDeducibles);
                break;
            case 'g':
                registrarGastoDeducible(gastosDeducibles);
                break;
            case 'I':
                registrarIngreso(ingresos);
                break;
            case 'i':
                registrarIngreso(ingresos);
                break;
            case 'C':
                construirDeclaracionAnual(ingresos, gastosDeducibles);
                break;
            case 'c':
                construirDeclaracionAnual(ingresos, gastosDeducibles);
                break;
            case 'S':
                salir = true;
                break;
            case 's':
                salir = true;
                break;
            default:
                alert("Por favor, introduzca una opción válida.")
                break;
        }
    } while (!salir)
}

// ***********************************************************************************************************
S