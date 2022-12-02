let deckId = null;

async function getDecksByUserId(userId) {
    const settings = {
        method: "GET",
    };
    const decks = await makeRequest(BASE_URL + '/deck/user/' + userId, settings);
    return decks;
}


async function getDeckById(deckId) {
    const settings = {
        method: "GET",
    };
    return await makeRequest(BASE_URL + '/deck/' + deckId, settings);
}

async function showDecks(container, displayMode) {
    const data = await getDecksByUserId(loggedInUser.id)
    console.log(data)
    displayMode(container, data)

}

function displayAllDecksInModal(container, items) {
    container.innerHTML = ""
    items.forEach(deck => {
        container.innerHTML += `
        <div class="showAll-display-elements" deck-id="${deck.id}">
        <h1 class="showAll-display-elements-name">${deck.name}</h1>
        <h5 class="showAll-display-elements-description">${deck.description}</h5>
      </div>`
        console.log(deck)
        console.log("Deck id: " + deck.id)
    });

    const goToDeckBtn = document.getElementsByClassName('showAll-display-elements')

    for (let i = 0; i < goToDeckBtn.length; i++) {
        addEventListener_goToDeckBtn(
            goToDeckBtn[i],
            goToDeckBtn[i].getAttribute('deck-id'),
        )
    }
}

const addEventListener_goToDeckBtn = (element, deckId) => {
    element.addEventListener('click', async e => {
        await getDeckById(deckId)
        console.log("ID på hvad jeg trykker på: " + deckId)
        const showAllDecksModal = document.getElementById('showAllDecks-modal')
        const showDeckByIdModal = document.getElementById('showDeckById-modal')
        selectedDeckId = deckId


        showDeckById(contentContainer, displayDeckById)
    })
}

/*Show Deck by ID*/
async function showDeckById(container, displayMode) {
    const data = await getDeckById(selectedDeckId)
    displayMode(container, data)
}


function displayDeckById(container, deck) {
    container.innerHTML = ""
    deck.deckLineCards.forEach(dlc => {
        container.innerHTML += ` 
        <div class="showdeckById-displayDecks-elements">
        <img class="cardImg"src="${dlc.card.imageUrl}">
      <p>${dlc.quantity}</p>
        </div> `
    }
    )
    console.log("displayDeckById kører")
}
  /*Show Deck by ID*/