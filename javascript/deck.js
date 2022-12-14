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

/*------------------------------PATCH MAPPINGS------------------------------*/
async function shiftToPublic(deckId) {
    const settings = {
        method: "PATCH",
    };
    return await makeRequest(BASE_URL + '/deck/shift-public/' + deckId, settings);
}

/*------------------------------PATCH MAPPINGS------------------------------*/


/*------------------------------DISPLAY DECKS------------------------------*/
async function showDecks(container, displayMode, type) {
    const decks = await getDecksByUserId(loggedInUser.id)
    displayMode(container, decks, type)
}
/*Show Decks by ID*/
async function showDeckById(container, displayMode) {
    const data = await getDeckById(currentPage.id)
    displayMode(container, data)
}
const addEventListener_goToDeckBtn = (element, deckId) => {
    element.addEventListener('click', async e => {
        if (window.location.href !== COLLECTION_ROUTE) {
            currentPage.type = "deck";
            window.location.href = COLLECTION_ROUTE;
        }
        await getDeckById(deckId)
        currentPage.type = "deck"
        currentPage.id = deckId;
        console.log("ID på DECK: " + deckId)
        console.log("ID på CurrentPage: " + currentPage.id)
        showDeckById(contentContainer, displayDeckById)
    })
}

function displayDeckById(container, deck) {
    container.innerHTML = ""
    document.getElementById('showAllCollections-title').innerHTML = "";
    document.getElementById('showAllCollections-modal').className = "showAll-modal-byId";

    deck.deckLineCards.forEach(dlc => {

        const dlcElement = createLcElement(dlc);
        container.appendChild(dlcElement)
        addEventListenersToQuantityElements(dlc);
        addEventListenerToCardImage(dlc);
    })



    contentContainerParent = document.getElementById('showAllCollections-title')
    addCardToCollectionById(contentContainerParent, deck)
    lcHandler = new LcHandler('dlc');
    shareDeckToUsername(deck.id, currentPage.type)
}



/*------------------------------DISPLAY DECKS------------------------------*/
