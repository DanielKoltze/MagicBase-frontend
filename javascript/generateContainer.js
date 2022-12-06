/*------------------------------GETMAPPINGS------------------------------*/
/*----------Collection----------*/
async function getCollectionsByUserId(userId) {
    const settings = {
        method: "GET",
    };
    const collections = await makeRequest(BASE_URL + '/collection/user/' + userId, settings);
    return collections;
}

async function getCollectionById(collectionId) {
    const settings = {
        method: "GET",
    };
    return await makeRequest(BASE_URL + '/collection/' + collectionId, settings);
}
/*----------Collection----------*/


/*----------Deck----------*/
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
/*----------Deck----------*/
/*------------------------------GETMAPPINGS------------------------------*/



/*------------------------------DELETEMAPPING------------------------------*/
async function deleteCollectionOrDeck(type, id) {
    const settings = {
        method: "DELETE",
    }
    await makeRequest(BASE_URL + "/" + type + "/" + id + "/user/" + loggedInUser.id, settings)
}
/*------------------------------DELETEMAPPING------------------------------*/



/*------------------------------DISPLAY ELEMENTS------------------------------*/
function displayAllElementsInModal(container, items, type) {
    container.innerHTML = ""
    items.forEach(element => {
        container.innerHTML += `
      <div class="showAll-display-elements" element-id="${element.id}">
        <h1 class="showAll-display-elements-name">${element.name}</h1>
        <h5 class="showAll-display-elements-description">${element.description}</h5>
        </div>`
        console.log(element)
        console.log("Element id: " + element.id)
    });

    const goToElementBtn = document.getElementsByClassName('showAll-display-elements')
    clearAddToCollectionButton()

    /*GO TO "DISPLAY COLLECTIONS"*/
    if (type === "collection") {
        for (let i = 0; i < goToElementBtn.length; i++) {
            addEventListener_goToCollectionBtn(
                goToElementBtn[i],
                goToElementBtn[i].getAttribute('element-id'),
            )
        }
        console.log("Current type clicked: " + type)
    }
    /*GO TO "DISPLAY DECKS"*/
    if (type === "deck") {
        for (let i = 0; i < goToElementBtn.length; i++) {
            addEventListener_goToDeckBtn(
                goToElementBtn[i],
                goToElementBtn[i].getAttribute('element-id'),
            )
        }
        console.log("Current type clicked: " + type)
    }
}
/*------------------------------DISPLAY ELEMENTS------------------------------*/


/*------------------------------ADD CARD TO ELEMENT------------------------------*/
function addCardToCollectionById(container, collection) {
    container.innerHTML += `
    <button class="createCardButton" id="${collection.id}">Add Card</button>
    `
    const addCardBtn = document.querySelector('.createCardButton')
    console.log("addCardtoCollection modal kører")
    console.log(collection.id)

    addCardBtn.addEventListener('click', async e => {
        console.log("addCardtoCollection modal kører")
        console.log(currentPage)
        createCardModal(collection);
    })
}
function clearAddToCollectionButton() {
    contentContainerParent = document.querySelector('showAllCollections-title')
    if (currentPage.type === "collection") {
        document.getElementById('showAllCollections-title').innerHTML = "MY COLLECTIONS"
    }
    if (currentPage.type === "deck") {
        document.getElementById('showAllCollections-title').innerHTML = "MY DECKS"
    }
}
/*------------------------------ADD CARD TO ELEMENT------------------------------*/



/*------------------------------DISPLAY COLLECTIONS------------------------------*/
async function showCollections(container, displayMode, type) {
    const collections = await getCollectionsByUserId(loggedInUser.id)
    displayMode(container, collections, type)
}
/*Show Collection by ID*/
async function showCollectionById(container, displayMode) {
    const data = await getCollectionById(selectedCollectionId)
    displayMode(container, data)
}
const addEventListener_goToCollectionBtn = (element, collectionId) => {
    element.addEventListener('click', async e => {
        currentPage.id = collectionId;
        currentPage.type = "collection";
        await getCollectionById(collectionId)

        console.log("ID på COLLECTION: " + collectionId)
        selectedCollectionId = collectionId

        showCollectionById(contentContainer, displayCollectionById)
    })
}

function displayCollectionById(container, collection) {
    container.innerHTML = ""
    document.getElementById('showAllCollections-title').innerHTML = collection.name
    collection.collectionLineCards.forEach(clc => {
        container.innerHTML += ` 
        <div class="showCollectionById-displayCollections-elements">
        <img class="cardImg" src="${clc.card.imageUrl}">
        <div class="cardQuantityContainer">
          <h1 class="cardQuantity"><span class="plus-minus-quantity">➖</span>${clc.quantity}<span class="plus-minus-quantity">➕</span></h1>
        </div>
        </div>
         `
    }
    )
    contentContainerParent = document.getElementById('showAllCollections-title')
    addCardToCollectionById(contentContainerParent, collection)
    console.log("displayCollectionById kører")
}
/*------------------------------DISPLAY COLLECTIONS------------------------------*/

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
        currentPage.id = deckId;
        currentPage.type = "deck";
        await getDeckById(deckId)

        console.log("ID på DECK: " + deckId)
        selectedDeckId = deckId

        showDeckById(contentContainer, displayDeckById)
    })
}

function displayDeckById(container, deck) {
    container.innerHTML = ""
    document.getElementById('showAllCollections-title').innerHTML = deck.name
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