// Funcion para imprimir un usuario.

const dibujarUsuario = usuario => {
    const users__container = document.querySelector(".users__container");

    const html = `
                    <div class="card__image">
                        <img src=${usuario.picture.large} alt="">
                    </div>
                    
                    <div class="card__info">
                        <h2 class="card__title">
                            ${usuario.name.first} ${usuario.name.last}
                        </h2>
                        <div class="card__role">
                            <span class="material-icons">
                                work
                            </span>
                            <p class="card__role__text">
                                ${usuario.name.title}
                            </p>
                        </div>
                        <div class="card__location">
                            <span class="material-icons">
                                place
                            </span>
                            <p class="card__location__text">
                                ${usuario.location.city}, ${usuario.location.country} ${usuario.location.postcode}
                            </p>
                        </div>
                    </div>

                    <div class="card__footer">
                        <span class="card__date">
                            <span class="material-icons-outlined card__date__icon">
                                watch_later
                            </span>
                            <p class="card__date__text">1M ago</p>
                        </span>
                        <button class="btnLike">
                            <span class="material-icons-outlined">
                                favorite_border
                            </span>
                        </button>
                    </div>
                `;
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = html;

    users__container.append(card);
};

export { dibujarUsuario };
