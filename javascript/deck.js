let deckId = null;

async function getDecksByUserId(userId) {
    const settings = {
        method: "GET",
    };
    const decks = await makeRequest(BASE_URL + '/deck/user/' + userId, settings);
    return decks;
}

/*
async function getDecksById(deckId) {
    const settings = {
        method: "GET",
    };
    return await makeRequest(BASE_URL + '/deck/' + deckId, settings);
} */

async function showDecks(container, displayMode) {
    const data = await getDecksByUserId(loggedInUser.id)
    console.log(data)
    displayMode(container, data)

}

function displayAllDecksInModal(container, items) {
    container.innerHTML = ""

    items.forEach(deck => {
        container.innerHTML += `
        <div class="showAll-display-elements" id="${deck.id}">
        <h1 class="showAll-display-elements-name">${deck.name}</h1>
        <h5 class="showAll-display-elements-description">${deck.description}</h5>
      </div>`
        console.log(deck)
        console.log("Deck id: " + deck.id)
        const goToDeck = document.querySelector('.showAll-display-elements')

        goToDeck.addEventListener('click', e => {
            deckId = document.querySelector('.showAll-display-elements').id;
            console.log("ID på hvad jeg trykker på: " + deckId)
            const showAllDecksModal = document.getElementById('showAllDecks-modal')
            const showDeckByIdModal = document.getElementById('showDeckById-modal')
            showAllDecksModal.style.display = "none"
            showDeckByIdModal.style.display = "block"
            console.log("Showing Deck id: " + deckId)
            console.log(goToDeck);
            showDeckById(showDeckByIdModal, displayDeckById)
        })
    });
}



/*Show Deck by ID*/
/*
async function showDeckById(container, displayMode) {
    const data = await getDeckById(deckId)
    displayMode(container, data)
}
*/

function displayDeckById(container, deck) {
    container.innerHTML = ""
    deck.deckLineCards.forEach(dlc => {
        container.innerHTML += ` 
        <div class="showdeckById-displayDecks-elements">
      <p>${dlc.quantity}</p>
        </div> `
    }
    )
    console.log("displayDeckById kører")
}
  /*Show Deck by ID*/