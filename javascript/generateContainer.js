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
function addCardToCollectionById(container, item) {
    container.innerHTML += `
    <h3 class="addCardToCollectionById">${item.name}</h3>
    <button id="save-changes-${item.id}">Save</button>
    <button class="createCardButton" id="${item.id}">
    <span class="material-symbols-outlined createCardButtonFont">add</span></button>
    <button class="shareDeckButton" data-toggle="modal" data-target="#shareDeckmodal" id="shareDeck-${item.id}">
    <span class="material-symbols-outlined createCardButtonFont">send</span>
    </button>
    `

    if (currentPage.type === "collection") {
        $(`#save-changes-${item.id}`).click(async () => {
            await clcHandler.saveChanges();
            showCollectionById(contentContainer, displayCollectionById);
        })
    } else {
        $(`#save-changes-${item.id}`).click(async () => {
            await clcHandler.saveChanges();
            showDeckById(contentContainer, displayDeckById);
        })
    }


    const addCardBtn = document.querySelector('.createCardButton')
    console.log("addCardtoCollection modal kører")
    console.log(item.id)

    addCardBtn.addEventListener('click', async e => {
        console.log("createCardModal kører")
        createCardModal(item.name);
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
        console.log("---------------------- -------------------------------------------")
        console.log(collection)
        console.log(type)
        postShareDeckToUser(submit_ShareDeckUsername.value, collection, type)
    })
}

/*------------------------------SHARE DECK ELLER COLLECTION------------------------------*/
