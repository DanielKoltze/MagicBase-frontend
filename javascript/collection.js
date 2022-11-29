async function getCollectionsByUserId(userId) {
  const settings = {
    method: "GET",
  };
  const collections = await makeRequest(BASE_URL + '/collection/user/' + userId, settings);
  return collections;
}



async function showCollections(container, displayMode){
  const data = await getCollectionsByUserId(loggedInUser.id)
  displayMode(container,data)

}

function displayCollectionsInSidebar(container, items) {
  //const container = document.getElementById('deck-collection-container')
  container.innerHTML = ""

  items.forEach(collection => {
    
    container.innerHTML += `<div class="deck-collection-element-container">
      <p>${collection.name}</p>
      <p id="removeCollectionBtn${collection.id}">
        <span class="lock-symbol">🔒</span
        >
    </div>`

    const removeCollectionBtn = document.getElementById('removeCollectionBtn' + collection.id)
    const closeSymbol = document.createElement('span')
    closeSymbol.innerHTML = "❌"
    removeCollectionBtn.append(closeSymbol)

  });
}