document.addEventListener('DOMContentLoaded', function () {
    let checkboxSelected = [];

    async function getShows() {
        const response = await fetch("https://api.tvmaze.com/shows");
        const showsApi = await response.json();
        const randomShows = getRandomShows(showsApi, 15);
        renderCards(randomShows);


        function crearChecks() {
            let checkboxes = document.getElementById(`checkbox`); // Llamamos al Id del Html
            let checkboxFilter = showsApi
                .map(checks => checks.genres) // Obtener el array de géneros para cada objeto
                .flat(); // Aplanar los arrays en uno solo

            // Si deseas eliminar elementos duplicados, utiliza el método filter
            checkboxFilter = checkboxFilter.filter((genre, index, self) => {
                return self.indexOf(genre) === index;
            });

            let checkHtml = "";
            checkboxFilter.forEach(check => {
                checkHtml += `<label><input type="checkbox" value="${check}">${check}</label>`;
            });
            checkboxes.innerHTML = checkHtml;

            checkboxSelected = [];
            checkbox = document.querySelectorAll("input[type=checkbox]"); // Actualizar la lista de checkboxes
            checkbox.forEach(check => check.addEventListener("change", arrayFiltered)); // Usar el evento "change" en lugar de "click"
        }

        async function arrayFiltered() {
            if (checkboxSelected.length === 0) {
                const randomShows = await getRandomShows(showsApi, 15);
                renderCards(randomShows);
            } else {
                const showsFiltered = showsApi.filter(show => {
                    return show.genres.some(genre => checkboxSelected.includes(genre));
                });
                renderCards(showsFiltered);
            }
        }

        function renderCards(showsArray) {
            const showsContainer = document.getElementById("shows-filtrados");
            showsContainer.innerHTML = "";

            if (showsArray.length > 0) {
                let cards = [];
                for (let show of showsArray) {
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

            if (checkboxSelected.length === 0) {
                const randomShows = getRandomShows(showsApi, 15);
                renderCards(randomShows);
            }
        }

        function getRandomShows(showsArray, numShows) {
            const shuffledShows = showsArray.sort(() => 0.5 - Math.random());
            return shuffledShows.slice(0, numShows);
        }


        inicializar();
    }

    getShows();
});
