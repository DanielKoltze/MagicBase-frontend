let container = document.getElementById("decks-item")

async function getDecks(userId) {
  const settings = {
    method: "GET",
  };

  const decks = await makeRequest(`${BASE_URL}/deck/user/${userId}`, settings);
  return decks;
}

/*
myDeckLink.addEventListener("click", () => {
    console.log("show deck to danni")
});
*/
async function showDecks(container, displayMode) {
  const decks = await getDecks(loggedInUser.id)
  displayMode(container, decks)
}

function displayDecksInSidebar2(container, items) {
  container.innerHTML = ""
  items.forEach(deck => {
    container.innerHTML += `<div class="deck-name-element-container">
        <p>${deck.name}</p>
        <p id="removeDeckBtn${deck.id + "_" + deck.name}">
          <span class="lock-symbol">🔒</span
          >
      </div>`

    const removeCollectionBtn = document.getElementById('removeDeckBtn' + deck.id + "_" + deck.name)
    const closeSymbol = document.createElement('span')
    closeSymbol.innerHTML = "❌"
    removeCollectionBtn.append(closeSymbol)



    closeSymbol.addEventListener('click', async e => {
      if (window.confirm(`Are you sure want to delete this deck: ${deck.name}?`)) {
        await deleteCollectionOrDeck("deck", deck.id)
        const deckContainer = document.getElementById('deck-container')
        showDecks(deckContainer, displayDecksInSidebar2)
      }
    })
  });
}

function displayMyDeck() {
  const myDecks = document.getElementById('display-my-decks')
  myDecks.addEventListener('click', e => {
    const showAllDecksModal = document.getElementById('showAllDecks-modal')
    showDecks(showAllDecksModal, displayAllDecksInModal)
    console.log("Button clicked")
  })
}

