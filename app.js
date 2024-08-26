const botonEncriptar = document.querySelector(".boton__encriptar");
const botonDesencriptar = document.querySelector(".boton__desencriptar");
const textArea = document.querySelector(".text__area");
const pautas = document.querySelector(".pautas");
const respuesta = document.querySelector(".mensaje__encriptado");
const contenido = document.querySelector(".espacio__desencriptado");
const botonCopiar = document.querySelector(".boton__copiar");

const reglasValidacion = {
    vacio: "El campo de texto no debe estar vacío",
    caracteresEspeciales: "No debe tener acentos y caracteres especiales",
    minusculas: "El texto debe ser en minúscula"
};

function mostrarPautas(mensaje) {
    pautas.style.background = "#8e68e1";
    pautas.style.color = "#ffff";
    pautas.style.fontWeight = "800";
    pautas.textContent = mensaje;

    setTimeout(() => {
        pautas.removeAttribute("style");
    }, 1500);
}

function validarTexto(texto) {
    let textoNormalizado = texto.normalize("NFD").replace(/[$\.¿\?~!\¡@#%^&*()_|}\{[\]>\<:"`;,+\u0300-\u036f']/g, " ");
    
    if (texto === "") {
        mostrarPautas(reglasValidacion.vacio);
        return false;
    } else if (texto !== textoNormalizado) {
        mostrarPautas(reglasValidacion.caracteresEspeciales);
        return false;
    } else if (texto !== texto.toLowerCase()) {
        mostrarPautas(reglasValidacion.minusculas);
        return false;
    }
    return true;
}

function encriptarTexto(texto) {
    return texto
        .replace(/e/g, "enter")
        .replace(/i/g, "imes")
        .replace(/a/g, "ai")
        .replace(/o/g, "over")
        .replace(/u/g, "ufat");
}

function desencriptarTexto(texto) {
    return texto
        .replace(/enter/g, "e")
        .replace(/imes/g, "i")
        .replace(/ai/g, "a")
        .replace(/over/g, "o")
        .replace(/ufat/g, "u");
}

function procesarTexto(event, modo) {
    event.preventDefault();
    let texto = textArea.value;

    if (!validarTexto(texto)) return;

    texto = modo === "encriptar" ? encriptarTexto(texto) : desencriptarTexto(texto);
    
    respuesta.innerHTML = texto;
    botonCopiar.style.visibility = "inherit";
    contenido.remove();
}

botonEncriptar.addEventListener("click", e => procesarTexto(e, "encriptar"));
botonDesencriptar.addEventListener("click", e => procesarTexto(e, "desencriptar"));

botonCopiar.addEventListener("click", e => {
    e.preventDefault();
    const range = document.createRange();
    range.selectNodeContents(respuesta);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand("copy");
});
