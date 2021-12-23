import { pedirUsuarios } from "./http-provider.js";
import { dibujarUsuario } from "./userInterface.js";

// Listar usuarios (API)

// Buscar usuarios -> search field

// Paginar usuarios (cada 10)

// Ordenar usuarios (Alfabeticamente por nombre ASC y DESC)

export const init = async () => {
    console.time("fetch time test");
    const usuarios = await pedirUsuarios();
    console.timeEnd("fetch time test");

    console.log('First user example', usuarios[0]);

    for (let i = 0; i < 9; i++) {
        dibujarUsuario(usuarios[i]);
    }
};

init();
