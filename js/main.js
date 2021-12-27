import { pedirUsuarios } from "./http-provider.js";
import { añadirBotonesPaginas, dibujarPagina, filtrarBusqueda, ordenarAlpha, paginaActual } from "./userInterface.js";
let usuarios;
let usuariosFilter;

// Listar usuarios (API)
const init = async () => {
    console.time("fetch time test");
    usuarios = await pedirUsuarios();
    console.timeEnd("fetch time test");

    ordenarAlpha(usuarios, "nameasc");

    dibujarPagina(usuarios, 1);
    añadirBotonesPaginas(usuarios); //Añade la cantidad necesaria de botones.
    eventos();
};

const eventos = () => {
    // Buscar usuarios -> search field
    // Debe tomar el arreglo usuarios (con posible sort (mutacion) aplicado)
    // Bajo alguna circunstancia debe reiniciar el arreglo, por lo que necesito una copia.

    const search__input = document.querySelector("#search__input");
    search__input.addEventListener("input", e => {
        // Cada vez que cambia la busqueda, recrea usuariosFilter a partir de usuarios(original)
        usuariosFilter = filtrarBusqueda(usuarios, e.target.value);
        dibujarPagina(usuariosFilter, 1);
        añadirBotonesPaginas(usuariosFilter);
    });

    // Ordenar usuarios (Alfabeticamente por nombre ASC y DESC)
    const sort__input = document.querySelector("#sort__input");
    sort__input.addEventListener("change", e => {
        // TO DO: no tengo que hardcodear que muestre la pagina 1, debe mostrar la pagina mostrada antes de ordenar.
        // Entonces, debe saber en que pagina estamos, antes de ordenar. 
        let pagina = paginaActual.obtener;
        
        // En caso de que el arreglo haya sido filtrado, ordena y muestra el filtrado.
        if (Array.isArray(usuariosFilter)) {
            ordenarAlpha(usuariosFilter, e.target.value);
            dibujarPagina(usuariosFilter, pagina);
        }
        // Si no fue filtrado, ordena y muestra el original. 
        else {
            ordenarAlpha(usuarios, e.target.value);
            dibujarPagina(usuarios, pagina);
        }
    });

    // paginacion previo
    const pagination__btnprev = document.querySelector(".pagination__btnprev");
    pagination__btnprev.addEventListener("click", () => {
        const botones = [...document.querySelectorAll(".pagination__btn")];
        const currentButton = botones.find(boton => boton.classList.contains("current__page"));
        if (currentButton.innerText === "1") {
            console.log("ya estas en la primer pagina");
        } else {
            currentButton.previousElementSibling.click();
        }
    });

    // paginacion siguiente
    const pagination__btnnext = document.querySelector(".pagination__btnnext");
    pagination__btnnext.addEventListener("click", () => {
        const botones = [...document.querySelectorAll(".pagination__btn")];
        const currentButton = botones.find(boton => boton.classList.contains("current__page"));

        if (currentButton.innerText == botones.length) {
            console.log("estas en la ultima pagina");
        } else {
            currentButton.nextElementSibling.click();
        }
    });
};

init();
