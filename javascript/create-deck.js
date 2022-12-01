const createDeckBtn = document.getElementById("create-deck-btn")
createDeckBtn.addEventListener('click', async e => {
    const nameInput = document.getElementById("createDeckNameInput").value
    const descriptionInput = document.getElementById("createDeckDescriptionInput").value
    const formatTypeInput = document.getElementById("createDeckTypeInput").value


    const deck = {
        name: nameInput,
        description: descriptionInput,
        formatType: formatTypeInput,
        userId: loggedInUser.id
    }

    const settings = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(deck),
    };
    await makeRequest(BASE_URL + "/deck", settings)


    const deckContainer = document.getElementById('deck-container')
    showDecks(deckContainer, displayDecksInSidebar2)
})