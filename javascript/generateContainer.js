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
    <h3 class="addCardToCollectionById">${collection.name}</h3>
    <button class="createCardButton" id="${collection.id}">
    <span class="material-symbols-outlined createCardButtonFont">add</span></button>
    <button class="shareDeckButton" data-toggle="modal" data-target="#shareDeckmodal" id="shareDeck-${collection.id}">
    <span class="material-symbols-outlined createCardButtonFont">send</span>
    </button>
    `

    const addCardBtn = document.querySelector('.createCardButton')
    console.log("addCardtoCollection modal kører")
    console.log(collection.id)

    addCardBtn.addEventListener('click', async e => {
        console.log("createCardModal kører")
        createCardModal(collection.name);
        submitCards();
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

/*------------------------------SHARE DECK ELLER COLLECTION------------------------------*/

function shareDeckToUsername(collection, type) {
    shareDeckToUserModal();
    const submit_ShareDeckBtn = document.getElementById('submit-shareDeckButton')
    const submit_ShareDeckUsername = document.getElementById('share-deck-username')
    submit_ShareDeckBtn.addEventListener('click', async e => {
        postShareDeckToUser(submit_ShareDeckUsername.value, collection.id, type)
    })
}

/*------------------------------SHARE DECK ELLER COLLECTION------------------------------*/
