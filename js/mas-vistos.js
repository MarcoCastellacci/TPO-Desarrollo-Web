document.addEventListener('DOMContentLoaded', function () {
    async function getShows() {
        const response = await fetch("https://api.tvmaze.com/shows");
        const showsApi = await response.json();
        const showsMasVistos = showsApi.filter(show => show.rating.average >= 8.5);

        function renderCards(showsArray) {
            if (showsArray.length > 0) {
                let cards = [];
                for (let show of showsArray) {
                    const summary = show.summary && show.summary.length > 2 ? (show.summary.length > 40 ? show.summary.substring(0, 40) + '...' : show.summary) : '';
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
                                            <p class="card-text summary-short" id="${uniqueId}" data-contenido="${show.summary}">${summary}</p>
                                            <button class="mostrar-mas btn btn-primary" data-unique-id="${uniqueId}" data-summary="${show.summary}" > Mostrar más</button>
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

            const btnVerMas = document.getElementById('btn-ver-mas');
            btnVerMas.addEventListener('click', function () {
                // No se necesita ninguna acción aquí
            });

            const showsContainer = document.getElementById("shows-masVistos");
            if (showsContainer) {
                showsContainer.addEventListener('click', function (event) {
                    if (event.target.classList.contains('mostrar-mas')) {
                        const uniqueId = event.target.dataset.uniqueId;
                        const resumenTruncado = document.getElementById(uniqueId);
                        if (resumenTruncado.parentElement.firstChild === resumenTruncado && resumenTruncado.childNodes.length > 0) {
                            resumenTruncado.innerHTML = resumenTruncado.innerHTML.replace(/["&gt;]/g, '');
                        }
                        const contenidoCompleto = resumenTruncado.getAttribute('data-contenido');
                        mostrarPopup(contenidoCompleto);
                    }
                });
            } else {
                console.error("El elemento con ID 'shows-masVistos' no se encontró en el DOM.");
            }

            ocultarElementosProblematicos(); // Llamada para ocultar elementos problemáticos
        }
        inicializar();
    }

    getShows();
});