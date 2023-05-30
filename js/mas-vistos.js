document.addEventListener('DOMContentLoaded', function () {
    async function getShows() {
        const response = await fetch("https://api.tvmaze.com/shows");
        const showsApi = await response.json();
        const showsMasVistos = showsApi.filter(show => show.rating.average >= 8.5);

        let numElementosMostrados = 3; // Número inicial de elementos mostrados

        function verMas() {
            const showsContainer = document.getElementById("shows-masVistos");
            const elementos = showsContainer.children;
            const btnVerMas = document.getElementById("btn-ver-mas");

            // Mostrar más elementos si hay más disponibles
            if (numElementosMostrados < elementos.length) {
                const elementosAMostrar = Math.min(numElementosMostrados + 10, elementos.length);
                for (let i = numElementosMostrados; i < elementosAMostrar; i++) {
                    elementos[i].style.display = "block";
                }
                numElementosMostrados = elementosAMostrar;
                btnVerMas.textContent = "Ver menos";
            } else { // Ocultar elementos si se han mostrado todos
                for (let i = numElementosMostrados - 1; i > 2; i--) {
                    elementos[i].style.display = "none";
                }
                numElementosMostrados = 3;
                btnVerMas.textContent = "Ver más";
            }
        }

        function renderCards(showsArray) {
            if (showsArray.length > 0) {
                let cards = [];
                for (let show of showsArray) {
                    const summary = show.summary && show.summary.length > 2 ? (show.summary.length > 40 ? show.summary.substring(0, 40) + '...' : show.summary) : '';
                    // console.log(show.summary);
                    const uniqueId = `resumen-${show.id}`;
                    const card = `
                                <div class="card card-home">
                                    <img src="${show.image.original}" class="card-img-top" alt="${show.name} Image">
                                    <div class="card text-center card-show">
                                        <div class="card-header">
                                            Serie
                                        </div>
                                        <div class="card-body">
                                            <h5 class="card-title">${show.name}</h5>
                                            <a href="./index-ld.html?id=${show.id}" class="btn btn-primary">Más sobre ${show.name}</a>
                                        </div>
                                        <div class="card-footer text-body-secondary">
                                            Puntaje Medio: ${show.rating.average}
                                        </div>
                                    </div>
                                </div>
                            `;
                    cards.push(card);
                }
                document.getElementById("shows-masVistos").innerHTML = cards.join("");
            } else {
                document.getElementById("shows-masVistos").innerHTML =
                    `<div class="col">
                                <div class="card">
                                    <img src="./img/notfound.jpg" class="card-img-top" alt="Event Not Found">
                                    <div class="card-body">
                                        <h5 class="card-title">Show Not Found!</h5>
                                        <p class="card-text">The event you are looking for was not found!</p>
                                    </div>
                                </div>
                            </div>`;
            }
        }

        function mostrarPopup(descripcion) {
            const popupContainer = document.createElement('div');
            popupContainer.className = 'popup-container';

            const popupContent = document.createElement('div');
            popupContent.className = 'popup-content';
            popupContent.innerHTML = descripcion;

            const closeButton = document.createElement('button');
            closeButton.className = 'popup-close-button';
            closeButton.textContent = 'Cerrar';
            closeButton.addEventListener('click', cerrarPopup);

            popupContent.appendChild(closeButton);
            popupContainer.appendChild(popupContent);
            document.body.appendChild(popupContainer);
        }

        function cerrarPopup() {
            const popupContainer = document.querySelector('.popup-container');
            document.body.removeChild(popupContainer);
        }

        function ocultarElementosProblematicos() {
            const elementosProblematicos = document.querySelectorAll('.card-text.summary-short');
            elementosProblematicos.forEach((elemento) => {
                const contenido = elemento.innerHTML;
                if (contenido.includes('>')) {
                    elemento.style.display = 'none';
                }
            });
        }

        function inicializar() {
            renderCards(showsMasVistos);
            const showsContainer = document.getElementById("shows-masVistos");
            const elementos = showsContainer.children;
            console.log(elementos[0]);
            elementos[0].style.display = "none"; // Ocultar el primer elemento

            if (elementos.length > 0) {
                elementos[0].style.display = "none"; // Ocultar el primer elemento

                for (let i = 1; i < elementos.length && i < 5; i++) {
                    elementos[i].style.display = "block";
                }
            }
        }

        inicializar();

    }

    getShows();
});