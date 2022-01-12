



// **********************************************************************
// **********************************************************************

// Nota: esta copia fue para intentar hacer el contenedor de los botones más dinamico,
// De forma que se muestren justo la cantidad necesaria, por ej [2][3][4][...][10]
// y que vayan cambiando en función de la página, pero no alcancé por tiempo.
// Lo terminé convirtiendo en un grid que soporte +10 botones
// Manteniendo la responsividad del sitio. (apto para screen +330px )

// **********************************************************************
// **********************************************************************


const users__container = document.querySelector(".users__container");

const pagination__btncontainer = document.querySelector(".pagination__btncontainer");

const PAGE_SIZE = 10;

let paginaActual = {
    numero: 1,
    get obtener() {
        return this.numero;
    },
    set cambiar(pagina) {
        this.numero = pagina;
    },
};

const showing__max = document.querySelector(".showing__max"); // 28 Candidates
const showing__number = document.querySelector(".showing__number"); // 1 - 10

const dibujarUsuario = usuario => {
    const html = `
                    <div class="card__image">
                        <img src=${usuario.picture.large} alt="">
                    </div>
                    
                    <div class="card__info">
                        <h2 class="card__title">
                            ${usuario.name.first} ${usuario.name.last}
                        </h2>
                        <div class="card__role">
                            <span id="work__icon" class="material-icons">
                                work
                            </span>
                            <p class="card__role__text">
                                Programmer
                            </p>
                        </div>
                        <div class="card__location">
                            <p class="card__location__text">
                                <span id="card__location__icon" class="material-icons">place</span>
                                ${usuario.location.city}, ${usuario.location.country} ${usuario.location.postcode}
                            </p>
                        </div>


                        <div class="card__footer">
                            <span class="card__date">
                                <span class="material-icons-outlined card__date__icon">
                                    watch_later
                                </span>
                                <p class="card__date__text">1M ago</p>
                            </span>
                            <button id="btn__like">
                                <span class="material-icons-outlined">
                                    favorite_border
                                </span>
                            </button>
                        </div>
                    </div>
                `;
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = html;
    users__container.append(card);
};

// Devuelve un arreglo conteniendo los usuarios de la página número N.
const paginateArray = (array, page_number) => {
    return array.slice((page_number - 1) * PAGE_SIZE, page_number * PAGE_SIZE);

    // Arreglo de 95, size de 10, number 9
    // pagina 9: slice(9-1 * 10, 9 * 10) = slice(80, 90) -> [80,89]
    // pagina 10: slice(10-1 * 10, 10 * 10) = slice(90, 100) -> [90,99] -> [90, 94]
    // del método slice: si el parametro final es mayor al length, extrae hasta el fin del length.
};

const vaciarContenedor = contenedor => {
    while (contenedor.children.length > 0) {
        contenedor.children[0].remove();
    }
};

// usuariosTotal puede o no ser el arreglo ya filtrado por busqueda.
const contabilizarUsuarios = (usuariosTotal, usuariosPagina) => {
    showing__max.innerHTML = `
        ${usuariosTotal.length} Candidates
    `; // 28 Candidates

    let firstUserShown = usuariosTotal.indexOf(usuariosPagina[0]) + 1;
    let lastUserShown = usuariosTotal.indexOf(usuariosPagina[usuariosPagina.length - 1]) + 1;

    showing__number.innerHTML = `
        ${firstUserShown}-${lastUserShown}
    `; // 1-10;
};

const dibujarPagina = (usuariosTotal, page_number) => {
    vaciarContenedor(users__container);
    let usuariosPagina = paginateArray(usuariosTotal, page_number);
    usuariosPagina.forEach(usuario => dibujarUsuario(usuario));
    console.log(usuariosPagina);
    contabilizarUsuarios(usuariosTotal, usuariosPagina, page_number);
};

const añadirBotonesPaginas = usuarios => {
    vaciarContenedor(pagination__btncontainer);

    let cantidadPaginas = Math.ceil(usuarios.length / PAGE_SIZE);
    for (let i = 1; i <= cantidadPaginas; i++) {
        // Creo los botones.
        const botonPagina = document.createElement("button");
        botonPagina.classList.add("pagination__btn");
        botonPagina.innerText = i;
        pagination__btncontainer.append(botonPagina);

        // Les agrego su evento de cambio de pagina.
        botonPagina.addEventListener("click", e => {
            dibujarPagina(usuarios, e.target.innerText);
            paginaActual.cambiar = e.target.innerText;
            [...pagination__btncontainer.children].forEach(button =>
                button.classList.remove("current__page")
            );
            e.target.classList.add("current__page");
        });
    }

    //Escondo algunos botones si son demasiados.
    // Si son más de 4, entonces
    if (pagination__btncontainer.children.length > 3) {
        //Escondo desde el cuarto hasta el ante ultimo.
        for (let i = 4; i < pagination__btncontainer.children.length; i++) {
            pagination__btncontainer.children[i - 1].classList.add("hide");
        }
        const botonExtra = document.createElement("button");
        botonExtra.classList.add("pagination__btn");
        botonExtra.innerText = "...";
        pagination__btncontainer.insertBefore(botonExtra, pagination__btncontainer.children[3]);
    }

    pagination__btncontainer.children[0].classList.add("current__page");
};

const filtrarBusqueda = (usuarios, valor) => {
    valor = valor.toLowerCase();
    return usuarios.filter(
        user =>
            user.name.first.toLowerCase().includes(valor) ||
            user.name.last.toLowerCase().includes(valor) ||
            user.location.city.toLowerCase().includes(valor) ||
            user.location.country.toLowerCase().includes(valor) ||
            user.location.postcode.toString().toLowerCase().includes(valor)
    );
};

// El ordenamiento muta al arreglo original, y ese debe ser usado para filtrar.
const ordenarAlpha = (array, parametro) => {
    if (parametro === "nameasc") {
        array.sort((a, b) => a.name.first.localeCompare(b.name.first));
    } else if (parametro === "namedesc") {
        array.sort((a, b) => b.name.first.localeCompare(a.name.first));
    } else if (parametro === "apellidoasc") {
        array.sort((a, b) => a.name.last.localeCompare(b.name.last));
    } else if (parametro === "apellidodesc") {
        array.sort((a, b) => b.name.last.localeCompare(a.name.last));
    } else if (parametro === "paisasc") {
        array.sort((a, b) => a.location.country.localeCompare(b.location.country));
    } else if (parametro === "paisdesc") {
        array.sort((a, b) => b.location.country.localeCompare(a.location.country));
    }
};

export { dibujarPagina, filtrarBusqueda, ordenarAlpha, añadirBotonesPaginas, paginaActual };
