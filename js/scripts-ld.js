async function getPeople() {
        await fetch('https://api.tvmaze.com/personas/1', {
            mode: 'cors',
            credentials: 'include'
          })
        .then(response => response.json())
        .then(JSON => peopleApi = JSON);
        
console.log(peopleApi)
    const peopleListElement = document.getElementById("people-list");

    function renderPeople(people) {
        if (people.length > 0) {
            let cards = [];
            for (let person of people) {
                const personCard = `
                    <div class="col">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${person.name}</h5>
                                <p class="card-text">Country: ${person.country.name}</p>
                                <p class="card-text">Birthday: ${person.birthday}</p>
                           </div>
                        </div>
                    </div>
                `;
                cards.push(personCard);
            }
            peopleListElement.innerHTML = cards.join("");
        } else {
            peopleListElement.innerHTML = `
            <div class="col">
            <div class="card">
                <div class="card-body">
                    <h3 class="card-title">No People Found!</h3>
                    <p class="card-text">No people are available at the moment.</p>
                </div>
            </div>
        </div>
    `;
}
}

renderPeople(peopleApi);
}

getPeople();