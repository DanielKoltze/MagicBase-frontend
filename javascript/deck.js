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

        container.innerHTML += `<div class="showAll-display-elements">
        <p>${deck.name}</p>
        <p id="removeDeckBtn${deck.id + "_" + deck.name}">
        <p id="goToDeckBtn">-------------GO_TO_DECK_BUTTON-------------</p>
        
          <span class="lock-symbol">🔒</span
          >
      </div>`
        //

        const goToDeck = document.getElementById('goToDeckBtn')

        goToDeck.addEventListener('click', e => {
            const showAllDecksModal = document.getElementById('showAllDecks-modal')
            const showDeckByIdModal = document.querySelector('.showDeckById-modal')
            showAllDecksModal.style.display = "none"
            showDeckByIdModal.style.display = "block"
            deckId = deck.id;
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
    // dlc: deckLineCards
    deck.deckLineCards.forEach(dlc => {
        container.innerHTML += ` 
        <div class="showdeckById-displayDecks-elements">
      <p>${dlc.quantity}</p>
        </div> `
    }
    )
}
  /*Show Deck by ID*/