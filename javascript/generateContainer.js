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

/*------------------------------DISPLAY COLLECTIONS------------------------------*/
async function showCollections(container, displayMode) {
    const collections = await getCollectionsByUserId(loggedInUser.id)
    displayMode(container, collections)
}


function displayAllElementsInModal(container, items) {
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

    for (let i = 0; i < goToElementBtn.length; i++) {
        addEventListener_goToElementBtn(
            goToElementBtn[i],
            goToElementBtn[i].getAttribute('element-id'),
        )
    }
}

const addEventListener_goToElementBtn = (element, elementId) => {
    element.addEventListener('click', async e => {
        currentPage.id = elementId;
        currentPage.type = "collection";
        console.log(currentPage);
        await getCollectionById(collectionId)

        console.log("ID på hvad jeg trykker på: " + collectionId)
        selectedCollectionId = collectionId

        showCollectionById(contentContainer, displayCollectionById)
    })
}
/*Show Collection by ID*/
async function showCollectionById(container, displayMode) {
    const data = await getCollectionById(selectedCollectionId)
    displayMode(container, data)
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
    addCardToCollectionById(contentContainerParent, collection.name, collection.id)
    console.log("displayCollectionById kører")
}


function addCardToCollectionById(container, collectionName, collectionId) {
    container.innerHTML += `
    <button class="createCardButton" id="${collectionId}">Add Card</button>
    `
    const addCardBtn = document.querySelector('.createCardButton')
    console.log("addCardtoCollection modal kører")
    console.log(collectionId)

    addCardBtn.addEventListener('click', async e => {
        createCardModal(collectionName);
    })
}



/*------------------------------DISPLAY COLLECTIONS------------------------------*/