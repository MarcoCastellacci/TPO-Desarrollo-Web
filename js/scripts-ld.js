const urlParams = new URLSearchParams(window.location.search);
const showId = urlParams.get('id');

if (showId) {
  const showSummary = `https://api.tvmaze.com/shows/${showId}`;
  fetch(showSummary)
    .then(response => response.json())
    .then(showData => {
      const castUrl = `https://api.tvmaze.com/shows/${showId}/cast`;
      fetch(castUrl)
        .then(response => response.json())
        .then(data => {

          const showName = showData.name;
          const showSummary = showData.summary;

          const castElement = document.getElementById('cast');
          // Mostrar el nombre del elemento
          const show = document.getElementById('show')
          const showElement = document.createElement('div')
          showElement.classList.add('show')
          const nameElement = document.createElement('h1');
          nameElement.textContent = showName;
          showElement.appendChild(nameElement);
          // Mostrar el resumen del elemento
          const summaryElement = document.createElement('p');
          summaryElement.innerHTML = showSummary;
          showElement.appendChild(summaryElement);

          show.appendChild(showElement)
          console.log(data);
          console.log(showData);
          //a cont se recorren los datos para mostrar el elemento 'cast'
          data.forEach(actor => {
            const actorElement = document.createElement('div');
            actorElement.classList.add('actor');

            const actorImage = document.createElement('img');
            actorImage.src = actor.person.image.medium;
            actorImage.alt = `Foto de ${actor.person.name}`;
            actorElement.appendChild(actorImage);

            const actorName = document.createElement('p');
            actorName.textContent = `Nombre: ${actor.person.name}`;
            actorElement.appendChild(actorName);

            const characterName = document.createElement('p');
            characterName.textContent = `Personaje: ${actor.character.name}`;
            actorElement.appendChild(characterName);

            const actorCountry = document.createElement('p');
            actorCountry.textContent = `País: ${actor.person.country ? actor.person.country.name : 'Desconocido'}`;
            actorElement.appendChild(actorCountry);

            const actorBirthYear = document.createElement('p');
            actorBirthYear.textContent = `Año de nacimiento: ${actor.person.birthday ? actor.person.birthday.substring(0, 4) : 'Desconocido'}`;
            actorElement.appendChild(actorBirthYear);

            castElement.appendChild(actorElement);
          });
        })
    })
    .catch(error => {
      console.log('Ha ocurrido un error:', error);
    });
}

