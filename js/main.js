import { pedirUsuarios } from "./http-provider.js";
import { añadirBotonesPaginas, dibujarPagina, filtrarBusqueda, ordenarAlpha } from "./userInterface.js";
let usuarios;
let usuariosCopy; // Mantengo una copia del arreglo original

// Listar usuarios (API)
const init = async () => {
    console.time("fetch time test");
    usuarios = await pedirUsuarios();
    console.timeEnd("fetch time test");
    usuariosCopy = [...usuarios]; // Copio

    ordenarAlpha(usuarios, "nameasc");

    dibujarPagina(usuarios, 1);
    añadirBotonesPaginas(usuarios); //Añade la cantidad necesaria de botones.
    eventoBotonesPaginas();
    eventos();
};

const eventos = () => {
    // Buscar usuarios -> search field
    const search__input = document.querySelector("#search__input");
    search__input.addEventListener("input", e => {
        usuarios = filtrarBusqueda(usuariosCopy, e.target.value); // muto usuarios.
        dibujarPagina(usuarios, 1);
        añadirBotonesPaginas(usuarios);
        eventoBotonesPaginas();
    });

    // Ordenar usuarios (Alfabeticamente por nombre ASC y DESC)
    const sort__input = document.querySelector("#sort__input");
    sort__input.addEventListener("change", e => {
        ordenarAlpha(usuarios, e.target.value);
        dibujarPagina(usuarios, 1);
    });

    // paginacion previo
    // const pagination__btnprev = document.querySelector(".pagination__btnprev");
    // pagination__btnprev.addEventListener("click", () => {
    //     dibujarPagina(usuarios, N);
    // });

    // paginacion siguiente
    // const pagination__btnnext = document.querySelector(".pagination__btnnext");
    // pagination__btnnext.addEventListener("click", () => {
    //     dibujarPagina(usuarios, N);
    // });
};

const eventoBotonesPaginas = () => {
    const pagination__buttons = document.querySelectorAll(".pagination__btn");
    for (let button of pagination__buttons) {
        button.addEventListener("click", e => {
            dibujarPagina(usuarios, e.target.innerText);

            pagination__buttons.forEach(button => button.classList.remove("current__page"));
            e.target.classList.add("current__page");
        });
    }
};

init();
