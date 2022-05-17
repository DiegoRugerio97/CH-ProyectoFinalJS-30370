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
const habilitarBoton = (isValid,boton) => {
    isValid ? boton.removeAttribute("disabled") : boton.setAttribute("disabled", "");
}

// Setear el class name 'invalido' para inputs que no pasaron la validacio
const renderValidacionInput = (input,isValid) =>{
    input.className = isValid ? "form-control campoTexto" : "form-control campoTexto invalido";
}