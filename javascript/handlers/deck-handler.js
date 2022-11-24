let myDeckLink= document.getElementById("my-decks")


async function getDecks(userId) {
    const settings = {
      method: "GET",
    }; 
    
    const decks = await makeRequest(`${BASE_URL}/deck/${userId}`, settings);
    return decks;
}


    myDeckLink.addEventListener("click", () => {
        console.log("show deck to danni")
    });

    async function showDecks(){
        const decks = await getDecks(loggedInUser.userId)

    }

