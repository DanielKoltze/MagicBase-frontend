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
    displayMyDecks()
}


function displayMyCollection() {
    const myCollections = document.getElementById("display-my-collections")

    myCollections.addEventListener('click', e => {
        const showAllCollectionsModal = document.getElementById('showAllCollections-modal')
        showCollections(showAllCollectionsModal, displayAllCollectionsInModal)
        const collections_showAll_parent = document.getElementById('collections-showAll-parent')
        collections_showAll_parent.style.display = "grid"

        const decks_showAll_parent = document.getElementById('decks-showAll-parent')
        decks_showAll_parent.style.display = "none"
    })
}
