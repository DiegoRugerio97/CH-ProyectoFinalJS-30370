// Utilidad
// Lectura de inputs
const valorInput = (input) => {
    return parseFloat(input.value);
}

const valorInputText = (input) => {
    return input.value;
}

//Alertas
// Creacion y limpieza de alerta
const alertas = document.getElementById("alertas");
const crearAlerta = () => {
    alertas.innerHTML = `<div class="alert alert-danger" role="alert">
    Favor de ingresar información correcta en los campos solicitados.
    </div>`;
}
const limpiarAlerta = () => {
    alertas.innerHTML = "";
}

//funcion utilizando condicional ternaria.
const habilitarBoton = (isValid, boton) => {
    isValid ? boton.removeAttribute("disabled") : boton.setAttribute("disabled", "");
}

// Setear el class name 'invalido' para inputs que no pasaron la validacion
const renderValidacionInput = (input, isValid) => {
    input.className = isValid ? "form-control campoTexto" : "form-control campoTexto invalido";
}

// Tags a para el cambio de tab
const tabAguinaldo = document.getElementById("tabAguinaldo");
const tabRetencion = document.getElementById("tabRetencion");
const tabAnual = document.getElementById("tabAnual");

// Funcion para resetear forms
const resetForms = () => {
    const inputs = document.getElementsByTagName("input");
    Array.from(inputs).forEach(input => {
        let containsInvalid = input.className.includes("invalido");
        if (containsInvalid) {
            input.className = "form-control campoTexto";
        }
        input.value = "";
    });
}

const limpiarTab = () => {
    limpiarAlerta();
    resetForms();
}


// Funcion para limpiar alerta en caso de cambio de tab
const cambioTab = (e) => {
    let isActive = e.target.className.includes("active")
    !isActive && limpiarTab();
}

// Se añaden listeners a las tabs
tabAguinaldo.addEventListener("click", cambioTab);
tabRetencion.addEventListener("click", cambioTab);
tabAnual.addEventListener("click", cambioTab);