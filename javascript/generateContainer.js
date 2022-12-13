let lcHandler = null;
/*------------------------------DISPLAY ELEMENTS------------------------------*/
function displayAllElementsInModal(container, items, type) {
    container.innerHTML = ""
    document.getElementById('showAllCollections-modal').className = "showAll-modal";
    let color = "";
    items.forEach(element => {
        if (type === "collection") {
            if (element.type === "ALL_CARDS") {
                color = "#fab565"
            } else if (element.type === "WISH") {
                color = "#00C4DD"
            } else if (element.type === "TRADE") {
                color = "#FD7AC6"
            }

            container.innerHTML += `
            <div style="border-color:${color};" class="showAll-display-elements" element-id="${element.id}">
            <h1 style="background:${color};border-color:${color};" class="showAll-display-elements-name">${element.name}</h1>
            <h5 class="showAll-display-elements-description">${element.description}</h5>
            <h5 style="background:${color};border-color:${color};" class="showAll-display-elements-type">${element.type}</h5>
            </div>
            `;
        }
        if (type === "deck") {
            container.innerHTML += `
            <div class="showAll-display-elements" element-id="${element.id}">
        <h1 class="showAll-display-elements-name">${element.name}</h1>
        <h5 class="showAll-display-elements-description">${element.description}</h5>
        <h5 class="showAll-display-elements-type">${element.formatType}</h5>
        </div>
            `}
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
    <div class="addCardToCollectionById-title">
    <h3 class="addCardToCollectionById">${item.name}</h3>
    <div class="titleAndButtonsGrid">
    <button class="createCardButton" id="${item.id}">
    <span class="material-symbols-outlined createCardButtonFont">add</span></button>
    <button class="saveCardButton" id="save-changes-${item.id}">
    <span class="material-symbols-outlined createCardButtonFont">save</span></button>
    <button class="shareDeckButton" data-toggle="modal" data-target="#shareDeckmodal" id="shareDeck-${item.id}">
    <span class="material-symbols-outlined createCardButtonFont">send</span>
    </button>
    </div>
    </div>
    `
    if (currentPage.type === "collection") {
        $(`#save-changes-${item.id}`).click(async () => {
            await lcHandler.saveChanges();
            showCollectionById(contentContainer, displayCollectionById);
        })
    } else {
        const titleAndButtonsGrid = document.querySelector('.titleAndButtonsGrid');
        if (item.hasBeenSetToPublic === true) {
            titleAndButtonsGrid.innerHTML += `
            <button class="shiftStatusButton" id="shiftToPublicButton-${item.id}">
            <span class="material-symbols-outlined createCardButtonFont">public</span>
            </button> `
        } else {
            titleAndButtonsGrid.innerHTML += `
            <button class="shiftStatusButtonPrivate" id="shiftToPublicButton-${item.id}">
            <span class="material-symbols-outlined createCardButtonFont">public_off</span>
            </button> `
        }


        $(`#shiftToPublicButton-${item.id}`).click(async () => {
            await shiftToPublic(item.id)
            showDeckById(contentContainer, displayDeckById);
        })
        $(`#save-changes-${item.id}`).click(async () => {
            await lcHandler.saveChanges();
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
        document.getElementById('showAllCollections-title').innerHTML = `
        <h3
        id="showAllCollectionsById-title"
        class="addCardToCollectionTitle"
      >MY COLLECTIONS</h3>`
    }
    if (currentPage.type === "deck") {
        document.getElementById('showAllCollections-title').innerHTML = `
        <h3
        id="showAllCollectionsById-title"
        class="addCardToCollectionTitle"
      >MY DECKS</h3>`
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






/*------------------------------CREATE LINECARDS ELEMENTS------------------------------*/

const createLcElement = lc => {
    const lcElement = document.createElement('div');
    lcElement.classList.add('showCollectionById-displayCollections-elements')
    lcElement.innerHTML =
        `<img class="cardImg" 
       id="lc-image-${lc.id}"
       src="${lc.card.imageUrl}"
       data-toggle="modal"
       data-target="#showSpecificCard">
       <div class="cardQuantityContainer" id="card-quantity-container-${lc.card.id}">
        <span id="lc-minus-btn-${lc.id}" class="plus-minus-quantity minus-quantity"><span class="material-symbols-outlined minus-quantity-symbol">
        remove
        </span></span>
        <span class="cardQuantity" id="lc-value-${lc.id}">${lc.quantity}</span>
        <span id="lc-plus-btn-${lc.id}" class="plus-minus-quantity plus-quantity"><span class="material-symbols-outlined plus-quantity-symbol">
        add
        </span></span>
      </div>`

    return lcElement;
}

const addEventListenersToQuantityElements = (lc) => {
    let count = lc.quantity;

    $(`#lc-plus-btn-${lc.id}`).click(function () {
        count++;
        $(`#lc-value-${lc.id}`).text(count)
        lcHandler.add(lc.id, lc.quantity, count);

    })

    $(`#lc-minus-btn-${lc.id}`).click(function () {
        count--;
        if (count < 0) {
            count = 0;
        }
        $(`#lc-value-${lc.id}`).text(count);
        lcHandler.add(lc.id, lc.quantity, count);
    })

}


/*------------------------------DISPLAY COLLECTIONS------------------------------*/


const addEventListenerToCardImage = (lc) => {

    let color = "";

    $(`#lc-image-${lc.id}`).click(() => {
        if (lc.card.rarity === "common") {
            color = "grey"
        } else if (lc.card.rarity === "uncommon") {
            color = "green"
        } else if (lc.card.rarity === "rare") {
            color = "blue"
        } else if (lc.card.rarity === "mythic") {
            color = "#FFB300"
        }

        showCardPopup(color, lc)

    })
}

const showCardPopup = (color, lc) => {
    $('#specificCardContainer').html(

        `<div class="specifikCardImgContainer" style="box-shadow: 0 0 10px ${color}; border-radius: 20px;">
          <img id="specificCardImg" src="${lc.card.imageUrl}" alt="">
       </div>
       <div style="box-shadow: inset 0 0 0 2px ${color};" class="specfikCardTextContainer">
          <h1>${lc.card.name}</h1>
          <div style="background:${color} ;" class="diamondSpecificCard"></div>
       </div>`
    )
}


