import { pedirUsuarios } from "./http-provider.js";
import { dibujarPagina, filtrarBusqueda, ordenarAlpha, vaciarContenedor } from "./userInterface.js";
let usuarios;


// Listar usuarios (API)
const init = async () => {
    console.time("fetch time test");
    usuarios = await pedirUsuarios();
    console.timeEnd("fetch time test");

    ordenarAlpha(usuarios, "nameasc");
    // Paginar usuarios (cada 10)
    dibujarPagina(usuarios, 1);
};


const eventos = () => {
    // Buscar usuarios -> search field
    const search__input = document.querySelector("#search__input");
    search__input.addEventListener("input", e => {
        let arrayBusqueda = filtrarBusqueda(usuarios, e.target.value);
        vaciarContenedor();
        dibujarPagina(arrayBusqueda, 1);
    });

    // Ordenar usuarios (Alfabeticamente por nombre ASC y DESC)
    const sort__input = document.querySelector("#sort__input");
    sort__input.addEventListener("change", e => {
        ordenarAlpha(usuarios, e.target.value);
        vaciarContenedor();
        dibujarPagina(usuarios, 1);
    });

    // paginacion previo
    // paginacion siguiente
    // paginacion numeral
}


init();
eventos();


