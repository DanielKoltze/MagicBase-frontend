
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
        console.log(deck)
        container.innerHTML += `<div class="deck-name-element-container">
        <p>${deck.name}</p>
        <p id="removeCollectionBtn${deck.id + "_" + deck.name}">
          <span class="lock-symbol">🔒</span
          >
      </div>`

        const removeCollectionBtn = document.getElementById('removeCollectionBtn' + deck.id + "_" + deck.name)
        const closeSymbol = document.createElement('span')
        closeSymbol.innerHTML = "❌"
        removeCollectionBtn.append(closeSymbol)
        //closeSymbol.addEventListener('click',)


    });


}
