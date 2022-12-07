/*------------------------------GETMAPPINGS------------------------------*/
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
/*------------------------------GETMAPPINGS------------------------------*/


/*------------------------------DISPLAY DECKS------------------------------*/
async function showDecks(container, displayMode, type) {
    const decks = await getDecksByUserId(loggedInUser.id)
    displayMode(container, decks, type)
}
/*Show Decks by ID*/
async function showDeckById(container, displayMode) {
    const data = await getDeckById(selectedDeckId)
    displayMode(container, data)
}
const addEventListener_goToDeckBtn = (element, deckId) => {
    element.addEventListener('click', async e => {

        await getDeckById(deckId)

        selectedDeckId = deckId
        currentPage.id = deckId;
        console.log("ID på DECK: " + deckId)
        console.log("ID på CurrentPage: " + currentPage.id)
        showDeckById(contentContainer, displayDeckById)
    })
}

function displayDeckById(container, deck) {
    container.innerHTML = ""
    document.getElementById('showAllCollections-title').innerHTML = "";
    deck.deckLineCards.forEach(dlc => {
        container.innerHTML += ` 
        <div class="showCollectionById-displayCollections-elements">
        <img class="cardImg" src="${dlc.card.imageUrl}">
        <div class="cardQuantityContainer">
          <h1 class="cardQuantity"><span class="plus-minus-quantity">➖</span>${dlc.quantity}<span class="plus-minus-quantity">➕</span></h1>
        </div>
        </div>
         `
    }
    )
    contentContainerParent = document.getElementById('showAllCollections-title')
    addCardToCollectionById(contentContainerParent, deck)
    console.log("displayDeckById kører")
}
/*------------------------------DISPLAY DECKS------------------------------*/