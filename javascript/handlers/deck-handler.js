/*------------------------------GETMAPPINGS------------------------------*/
async function getDecks(userId) {
  const settings = {
    method: "GET",
  };
  const decks = await makeRequest(`${BASE_URL}/deck/user/${userId}`, settings);
  return decks;
}

async function getPublicDecks() {
  const settings = {
    method: "GET",
  };
  const decks = await makeRequest(`${BASE_URL}/deck/all-public`, settings);
  return decks;
}

/*------------------------------GETMAPPINGS------------------------------*/

/*------------------------------SIDEBAR------------------------------*/
function displayDecksInSidebar2(container, items) {
  container.innerHTML = ""

  for (const deck of items) {
    container.innerHTML +=
      `<div class="deck-collection-element-container">
    <div class="sidebar-deck-name-container sidebar-name-container">
        <p>${deck.name}</p>
        </div>
        <p class="sidebar-button-container">
          <span class="lock-symbol">🔒</span>
          <span class="delete-deck-button" deck-id="${deck.id}" deck-name="${deck.name}">❌</span>
        </p>
      </div>`
  }

  const deckNameContainerElements = document.getElementsByClassName('sidebar-deck-name-container')
  console.log(deckNameContainerElements.length)
  const deleteBtnElements = document.getElementsByClassName('delete-deck-button');
  console.log(deleteBtnElements.length)

  const elementListSize = deckNameContainerElements.length;
  for (let i = 0; i < elementListSize; i++) {
    addEventListenerToDeckElement(
      deleteBtnElements[i],
      deleteBtnElements[i].getAttribute('deck-id'),
      deleteBtnElements[i].getAttribute('deck-name')
    );
    addEventListener_goToDeckBtn(
      deckNameContainerElements[i],
      deleteBtnElements[i].getAttribute('deck-id')
    );
  }
}


const addEventListenerToDeckElement = (element, deckId, deckName) => {
  element.addEventListener('click', async e => {
    if (window.confirm(`Are you sure want to delete this deck: ${deckName}?`)) {
      await deleteCollectionOrDeck("deck", deckId)
      const deckContainer = document.getElementById('deck-container')
      // lige her
      showDecks(deckContainer, displayDecksInSidebar2, "deck")

    }
  })
}
/*------------------------------SIDEBAR------------------------------*/

//Decks bliver kaldt i "collection()"