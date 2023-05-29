document.addEventListener('DOMContentLoaded', function () {
    let checkboxSelected = [];

    async function getShows() {
        const response = await fetch("https://api.tvmaze.com/shows");
        const showsApi = await response.json();
        const showsMasVistos = showsApi.filter(show => show.rating.average >= 8);
        console.log(showsMasVistos);

        function crearChecks() {
            let checkboxes = document.getElementById(`checkbox`); // Llamamos al Id del Html
            let checkboxFilter = showsApi
                .map(checks => checks.genres) // Obtener el array de géneros para cada objeto
                .flat(); // Aplanar los arrays en uno solo

            // Si deseas eliminar elementos duplicados, utiliza el método filter
            checkboxFilter = checkboxFilter.filter((genre, index, self) => {
                return self.indexOf(genre) === index;
            }); // Con este .map recorremos el array original filtramos por "category" y con "new Set" eliminamos los repetidos 

            let checkHtml = "";
            checkboxFilter.forEach(check => {
                checkHtml += `<label><input type="checkbox" value="${check}">${check}</label>`;
            });
            checkboxes.innerHTML = checkHtml; // Imprimimos el template armado

            checkboxSelected = []; // Reiniciamos el arreglo de checkboxes seleccionados
        }

        function arrayFiltered() {
            const showsFiltered = showsApi.filter(show => {
                if (checkboxSelected.length === 0) {
                    return true; // Si no hay checkbox seleccionados, mostrar todos los programas
                } else {
                    // Verificar si algún género del programa coincide con los checkbox seleccionados
                    return show.genres.some(genre => checkboxSelected.includes(genre));
                }
            });

            renderCards(showsFiltered);
        }

        function verMas() {
            const showsContainer = document.getElementById("shows-filtrados");
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
            const showsContainer = document.getElementById("shows-filtrados");
            showsContainer.innerHTML = "";

            if (showsArray.length > 0) {
                let cards = [];
                for (let show of showsArray) {
                    const summary = show.summary && show.summary.length > 2 ? (show.summary.length > 40 ? show.summary.substring(0, 40) + '...' : show.summary) : '';
                    const uniqueId = `resumen-${show.id}`;
                    const card = `
            <div class="card card-home" style="display: none;">
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
                showsContainer.innerHTML = cards.join("");
            } else {
                showsContainer.innerHTML = `
          <div class="col">
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

        function inicializar() {
            crearChecks();

            const checkbox = document.querySelectorAll("input[type=checkbox]");
            checkbox.forEach(check => check.addEventListener("click", (event) => {
                let checked = event.target.checked;
                if (checked) {
                    checkboxSelected.push(event.target.value);
                } else {
                    checkboxSelected = checkboxSelected.filter(nocheckeado => nocheckeado !== event.target.value);
                }
                arrayFiltered();
            }));

            const btnVerMas = document.getElementById('btn-ver-mas');
            btnVerMas.addEventListener('click', verMas);

            const showsContainer = document.getElementById("shows-filtrados");
            const elementos = showsContainer.children;
            console.log(elementos);
            for (let i = 1; i < elementos.length && i < 5; i++) {
                elementos[i].style.display = "block";
            }
            if (elementos.length > 4) {
                elementos[3].style.display = "none";
            }

            showsContainer.addEventListener('click', function (event) {
                if (event.target.classList.contains('mostrar-mas')) {
                    const uniqueId = event.target.dataset.uniqueId;
                    const resumenTruncado = document.getElementById(uniqueId);
                    if (resumenTruncado.parentElement.firstChild === resumenTruncado && resumenTruncado.childNodes.length > 0) {
                        resumenTruncado.innerHTML = resumenTruncado.innerHTML.replace(/[">]/g, '');
                    }
                    const contenidoCompleto = resumenTruncado.getAttribute('data-contenido');
                    mostrarPopup(contenidoCompleto);
                }
            });
        }

        inicializar();
    }

    getShows();
});
