const users__container = document.querySelector(".users__container");

const PAGE_SIZE = 10;

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

const paginateArray = (array, page_number) => {
    return array.slice((page_number - 1) * PAGE_SIZE, page_number * PAGE_SIZE);
    // arreglo de 100, size de 10, number de 10.
    // pagina 2: slice(2-1 * 10, 2 * 10) = slice(10, 20)
};

const contabilizarUsuarios = (usuarios) => {
    let cantidadMostrada = users__container.children.length;
    let cantidadTotal = usuarios.length;
    showing__max.innerHTML = `
        ${cantidadTotal} Candidates
    `; // 28 Candidates
    showing__number.innerHTML = `
        ${cantidadMostrada} - ${PAGE_SIZE}
    `; // 1 - 10;
};

const dibujarPagina = (array, page_number) => {
    paginateArray(array, page_number).forEach(usuario => dibujarUsuario(usuario));
    contabilizarUsuarios(array);
};

const vaciarContenedor = () => {
    while (users__container.children.length > 0) {
        users__container.children[0].remove();
        console.log("vaciarContenedor() - contenedor vaciado.");
    }
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


export { dibujarPagina, vaciarContenedor, filtrarBusqueda, ordenarAlpha };
