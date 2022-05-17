// Utilidad
const valorInput = (input) => {
    return parseFloat(input.value);
}

const valorInputText = (input) => {
    return input.value;
}

//Alertas
const alertas = document.getElementById("alertas");
const crearAlerta = () => {
    alertas.innerHTML = `<div class="alert alert-danger" role="alert">
    Favor de ingresar información correcta en los campos solicitados.
    </div>`;
}
const limpiarAlerta = () => {
    alertas.innerHTML = "";
}
