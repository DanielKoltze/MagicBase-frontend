let collectionId = null;

async function getCollectionsByUserId(userId) {
  const settings = {
    method: "GET",
  };
  const collections = await makeRequest(BASE_URL + '/collection/user/' + userId, settings);
  return collections;
}

async function getCollectionById(collectionId) {
  const settings = {
    method: "GET",
  };
  return await makeRequest(BASE_URL + '/collection/' + collectionId, settings);
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

    closeSymbol.addEventListener('click', async e => {
      if (window.confirm(`Are you sure want to delete this collection: ${collection.name}?`)) {
        await deleteCollectionOrDeck("collection", collection.id)
        const collectionContainer = document.getElementById('deck-collection-container')
        showCollections(collectionContainer, displayCollectionsInSidebar)

      }


    })

  });
}


/*
function displayAllCollectionsInModal(container, items) {
  container.innerHTML = ""
  items.forEach(collection => {
    container.innerHTML += `
    <div class="showAll-display-elements" id="goToCollectionBtn${collection.id + "_" + collection.name}">
      <p>${collection.name}</p>
      <p>Id: ${collection.id}</p>
      </div>`
    console.log(collection)
    console.log(collection.id)

    const goToCollection = document.getElementById('goToCollectionBtn' + collection.id + "_" + collection.name)


    goToCollection.addEventListener('click', e => {
      collectionId = collection.id;
      const showAllCollectionsModal = document.getElementById('showAllCollections-modal')
      const showCollectionByIdModal = document.getElementById('showCollectionById-modal')
      showAllCollectionsModal.style.display = "none"
      showCollectionByIdModal.style.display = "block"

      console.log("Showing collected id " + collectionId)
      console.log(goToCollection)
      showCollectionById(showCollectionByIdModal, displayCollectionById)
    })
  }

  );
}

*/


function displayAllCollectionsInModal(container, items) {
  container.innerHTML = ""
  items.forEach(collection => {
    container.innerHTML += `
    <div class="showAll-display-elements" id="${collection.id}">
      <h1 class="showAll-display-elements-name">${collection.name}</h1>
      <h5 class="showAll-display-elements-description">${collection.description}</h5>
      </div>`
    console.log(collection)
    console.log(collection.id)

    const goToCollection = document.querySelector('.showAll-display-elements')


    goToCollection.addEventListener('click', e => {
      collectionId = document.querySelector('.showAll-display-elements').id;
      console.log("ID på hvad jeg trykker på: " + collectionId)
      const showAllCollectionsModal = document.getElementById('showAllCollections-modal')
      const showCollectionByIdModal = document.getElementById('showCollectionById-modal')
      showAllCollectionsModal.style.display = "none"
      showCollectionByIdModal.style.display = "block"

      console.log("Showing collected id " + collectionId)
      console.log(goToCollection)
      showCollectionById(showCollectionByIdModal, displayCollectionById)
    })
  }

  );
}


/*Show Collection by ID*/
async function showCollectionById(container, displayMode) {
  const data = await getCollectionById(collectionId)
  displayMode(container, data)
}

function displayCollectionById(container, collection) {
  container.innerHTML = ""
  collection.collectionLineCards.forEach(clc => {
    container.innerHTML += ` 
      <div class="showCollectionById-displayCollections-elements">
    <p>There are: ${clc.quantity} of this card</p>
      </div> `
  }
  )
  console.log("displayCollectionById kører")
}

/*Show Collection by ID*/
async function deleteCollectionOrDeck(type, id) {
  const settings = {
    method: "DELETE",
  }

  await makeRequest(BASE_URL + "/" + type + "/" + id + "/user/" + loggedInUser.id, settings)

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
/*
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
*/

