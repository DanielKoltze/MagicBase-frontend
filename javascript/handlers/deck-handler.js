
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
    console.log(decks);
    displayMode(container, decks)

}

function displayInSidebar(container, items) {
    items.forEach(deck => {
        container.innerHTML +=
            `<div class= "deck-sidebar-item">
            <p>${deck.name}</p>
            </div>`
    });


}
