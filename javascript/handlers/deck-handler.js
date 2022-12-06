/*------------------------------GETMAPPINGS------------------------------*/
async function getDecks(userId) {
  const settings = {
    method: "GET",
  };


  /*------------------------------GETMAPPINGS------------------------------*/

  /*------------------------------SIDEBAR------------------------------*/
  const decks = await makeRequest(`${BASE_URL}/deck/user/${userId}`, settings);
  return decks;
}
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
          <span class="lock-symbol">🔒</span>
          <span class="delete-deck-button" deck-id="${deck.id}" deck-name="${deck.name}">❌</span>
      </div>`



  });

  const deleteBtnElements = document.getElementsByClassName(
    'delete-deck-button');
  for (let i = 0; i < deleteBtnElements.length; i++) {
    addEventListenerToDeckElement(
      deleteBtnElements[i],
      deleteBtnElements[i].getAttribute('deck-id'),
      deleteBtnElements[i].getAttribute('deck-name')
    )
  }

}
const addEventListenerToDeckElement = (element, deckId, deckName) => {
  element.addEventListener('click', async e => {
    if (window.confirm(`Are you sure want to delete this deck: ${deckName}?`)) {
      await deleteCollectionOrDeck("deck", deckId)
      const deckContainer = document.getElementById('deck-container')
      // lige her
      showDecks(deckContainer, displayDecksInSidebar2)

    }
  })
}
/*------------------------------SIDEBAR------------------------------*/

//Decks bliver kaldt i "collection()"