let contentContainer = null;

const currentPage = {
    type: null,
    id: null
}

function collection() {
    if (loggedInUser == null) {
        window.location.href = DEFAULT_ROUTE;
    }
    const template = document.getElementById('collection');
    const clone = template.content.cloneNode(true);
    pageContainer.replaceChildren(clone);

    // Sidebar 
    const collectionContainer = document.getElementById('deck-collection-container')
    showCollections(collectionContainer, displayCollectionsInSidebar)

    const deckContainer = document.getElementById('deck-container')
    showDecks(deckContainer, displayDecksInSidebar2, "deck")
    // Sidebar 



    contentContainer = document.getElementById('showAllCollections-modal')
    addEventListenerToSidebarMyCollections()
    addEventListenerToSidebarMyDecks()
    addEventListenerToNavbarMyCollections()

    if (currentPage.type == "deck") {
        showDecks(contentContainer, displayAllElementsInModal, currentPage.type);
    } else {
        currentPage.type = "collection";
        // Det som bliver vist som default ude i højre container (ikke sidebar)
        showCollections(contentContainer, displayAllElementsInModal, currentPage.type)
    }
}


function addEventListenerToSidebarMyCollections() {
    const myCollections = document.getElementById("display-my-collections")

    myCollections.addEventListener('click', e => {
        if (window.location.href !== COLLECTION_ROUTE) {
            window.location.href = COLLECTION_ROUTE;
        }
        currentPage.type = "collection";
        showCollections(contentContainer, displayAllElementsInModal, currentPage.type)
    })
}

function addEventListenerToSidebarMyDecks() {
    const myDecks = document.getElementById('display-my-decks');
    myDecks.addEventListener('click', () => {
        if (window.location.href !== COLLECTION_ROUTE) {
            currentPage.type = "deck";
            window.location.href = COLLECTION_ROUTE;
        }
        currentPage.type = "deck";
        showDecks(contentContainer, displayAllElementsInModal, currentPage.type);

    })

}
function addEventListenerToNavbarMyCollections() {
    const navbarMyCollections = document.getElementById("navbar-display-my-collections")

    navbarMyCollections.addEventListener('click', e => {
        currentPage.type = "collection";
        if (window.location.href !== COLLECTION_ROUTE) {
            window.location.href = COLLECTION_ROUTE;
        }
        showCollections(contentContainer, displayAllElementsInModal, currentPage.type)
    })
}
