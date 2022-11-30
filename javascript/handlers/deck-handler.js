
let container = document.getElementById("decks-item")

async function getDecks(userId) {
    const settings = {
        method: "GET",
    };

    const decks = await makeRequest(`${BASE_URL}/deck/${userId}`, settings);
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



        closeSymbol.addEventListener('click', openModal)

        function openModal() {
            console.log('hej')
            document.body.innerHTML += `
          <div class="modal" tabindex="-1" role="dialog" id="delete-deck-collection-modal" data-keyboard="false" data-backdrop="static">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
               
              <div class="modal-body">
                <p style="color: black;">Do you want to delete this deck?</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal" id="delete-deck-collection-btn">Delete</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal" id="delete-deck-collection-close-btn">Close</button>
              </div>
            </div>
          </div>
        </div>
          `
            const modal = $('#delete-deck-collection-modal')
            modal.modal('show')
            const btn = document.getElementById("delete-deck-collection-btn")
            const closeBtn = document.getElementById('delete-deck-collection-close-btn')
            closeBtn.addEventListener('click', e => {
                deleteModal()

                const deckContainer = document.getElementById('deck-container')
                showDecks(deckContainer, displayDecksInSidebar2)
            })
            btn.addEventListener('click', async e => {
                deleteModal()

                await deleteCollectionOrDeck("deck", deck.id)
                const deckContainer = document.getElementById('deck-container')
                showDecks(deckContainer, displayDecksInSidebar2)

            })
            function deleteModal() {
                document.body.removeChild(document.getElementById('delete-deck-collection-modal'))
            }



        }


    });


}
