function collection() {
    console.log("Har routet til collection")
    if (loggedInUser == null) {
        window.location.href = DEFAULT_ROUTE;
    }
    const collectionContainer = document.getElementById('deck-collection-container')
    showCollections(collectionContainer, displayCollectionsInSidebar)

    const deckContainer = document.getElementById('deck-container')
    showDecks(deckContainer, displayDecksInSidebar2)

    displayMyCollection();
    displayMyDeck();
}


function displayMyCollection() {
    const myCollection = document.getElementById("display-my-collection")
    myCollection.addEventListener('click', e => {
        const showAllCollectionsModal = document.getElementById('showAllCollections-modal')
        showCollections(showAllCollectionsModal, displayAllCollectionsInModal)
    })
}
