async function getCollectionsByUserId(userId) {
  const settings = {
    method: "GET",
  };
  const collections = await makeRequest(BASE_URL + '/collection/user/' + userId, settings);
  return collections;
}



async function showCollections(container, displayMode) {
  const data = await getCollectionsByUserId(loggedInUser.id)
  displayMode(container, data)

}

function displayCollectionsInSidebar(container, items) {
  //const container = document.getElementById('deck-collection-container')
  container.innerHTML = ""

  items.forEach(collection => {

    container.innerHTML += `<div class="deck-collection-element-container">
      <p>${collection.name}</p>
      <p id="removeCollectionBtn${collection.id + "_" + collection.name}">
        <span class="lock-symbol">🔒</span
        >
    </div>`

    const removeCollectionBtn = document.getElementById('removeCollectionBtn' + collection.id + "_" + collection.name)
    const closeSymbol = document.createElement('span')
    closeSymbol.innerHTML = "❌"
    removeCollectionBtn.append(closeSymbol)
    closeSymbol.addEventListener('click', e => {
      $('#delete-deck-collection-modal').modal('show')
      document.getElementById('delete-deck-collection-btn').addEventListener('click', e => {
        console.log("asdfasd")
        deleteCollectionOrDeck("collection", collection.id)
      })

    })

  });
}
async function deleteCollectionOrDeck(type, id) {
  const settings = {
    method: "DELETE",
  }

  await makeRequest(BASE_URL + "/" + type + "/delete/" + id, settings)

}

async function createCollection(collection) {

  const settings = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(collection),
  };

  return addedCollection = await makeRequest(`${BASE_URL}/collection`, settings);

}

const createCollectionBtn = document.querySelector('#create-collection-btn')

createCollectionBtn.addEventListener('click', async (e) => {
  const createCollectionNameInput = document.querySelector('#createCollectionNameInput').value
  const createCollectionDescriptionInput = document.querySelector('#createCollectionDescriptionInput').value
  const createCollectionTypeInput = document.querySelector('#createCollectionTypeInput').value
  const collection = {
    userId: loggedInUser.id,
    name: createCollectionNameInput,
    description: createCollectionDescriptionInput,
    type: createCollectionTypeInput,
  };
  await createCollection(collection)
})
