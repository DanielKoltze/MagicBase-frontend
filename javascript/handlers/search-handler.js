async function searchCollection(searchWord, collectionId) {
    const settings = {
        method: "GET",
    };
    const sortedCards = await makeRequest(BASE_URL + '/clc/search/' + collectionId + "?search-word=" + searchWord, settings);
    return sortedCards;
}

function addEventListenerToSpecificCollectionSearch(collection) {
    document.getElementById('search-button').addEventListener('click', async e => {
        console.log('hejhjehjajsdhjas')
    })
    $('#search-button').click(async () => {
        const searchWord = document.getElementById('search-input').value;
        const sortedCards = await searchCollection(searchWord, currentPage.id);
        displayCollectionByIdByList(contentContainer, collection, sortedCards);
    })
}