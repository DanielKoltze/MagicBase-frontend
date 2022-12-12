



const inspiration = async () => {
    const template = document.getElementById('collection');
    const clone = template.content.cloneNode(true);
    pageContainer.replaceChildren(clone);

    const container = document.getElementById('showAllCollections-modal')
    const decks = await getPublicDecks();
    renderDecks(container, decks)

}




const renderDecks = (container, decks) => {
    decks.forEach(deck => {
        document.getElementById('showAllCollections-title').innerHTML = "INSPIRATION";
        let color = "";
        container.innerHTML += `
        <div style="border-color:${color};" class="showAll-display-elements" id="deck-${deck.id}">
        <h1 style="background:${color};border-color:${color};" class="showAll-display-elements-name">${deck.name}</h1>
        <h5 class="showAll-display-elements-description">${deck.description}</h5>
        <h5 style="background:${color};border-color:${color};" class="showAll-display-elements-type">${deck.formatType}</h5>
        </div>
        `;

        addEventListenerDeckInspiration(deck);


    })


}
const addEventListenerDeckInspiration = (deck) => {
    $(`#deck-${deck.id}`).click(async () => {
        const container = document.getElementById('showAllCollections-modal')
        const specificDeck = await getDeckById(deck.id);
        displayInspirationDeckById(container, specificDeck)

    })
}


const displayInspirationDeckById = (container, deck) => {
    container.innerHTML = ""
    const titleContainer = document.getElementById('showAllCollections-title')
    titleContainer.innerHTML = `${deck.name}`
    if (loggedInUser != null) {

        titleContainer.innerHTML += `

    <button id="share-button-${deck.id}"><span class="material-symbols-outlined">save</span></button>
    `;

        addEventListenerToCopyButton(deck);
    }
    document.getElementById('showAllCollections-modal').className = "showAll-modal-byId";
    deck.deckLineCards.forEach(dlc => {

        const clcElement = createInspirationLcElement(dlc);
        container.appendChild(clcElement)
        addEventListenerToCardImage(dlc);
    }
    )


}

const addEventListenerToCopyButton = deck => {
    $(`#share-button-${deck.id}`).click(async () => {
        await postShareDeckToUser(loggedInUser.username, deck.id, "deck")


        const deckContainer = document.getElementById('deck-container')
        showDecks(deckContainer, displayDecksInSidebar2)
    })

}

const createInspirationLcElement = lc => {
    const lcElement = document.createElement('div');
    lcElement.classList.add('showCollectionById-displayCollections-elements')
    lcElement.innerHTML =
        `<img class="cardImg" 
       id="lc-image-${lc.id}"
       src="${lc.card.imageUrl}"
       data-toggle="modal"
       data-target="#showSpecificCard">
       <div class="cardQuantityContainer" id="card-quantity-container-${lc.card.id}">
        <span class="cardQuantity" id="lc-value-${lc.id}">${lc.quantity}</span>
      </div>`

    return lcElement;
}
