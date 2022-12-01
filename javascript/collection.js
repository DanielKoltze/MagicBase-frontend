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
    closeSymbol.classList.add('delete-collection')
    closeSymbol.setAttribute('collection-id', collection.id)
    closeSymbol.setAttribute('collection-name', collection.name)
    closeSymbol.innerHTML = "❌"
    removeCollectionBtn.append(closeSymbol)
    
    
  });

  const deleteBtnElements = document.getElementsByClassName('delete-collection');
  

  for (let i = 0; i < deleteBtnElements.length ; i++) {
    addEventListenerToElement(
      deleteBtnElements[i],
      deleteBtnElements[i].getAttribute('collection-id'),
       deleteBtnElements[i].getAttribute('collection-name')
       )
  }

}

const addEventListenerToElement = (element, collectionId, collectionName) => {

  element.addEventListener('click', async e => {
      if (window.confirm(`Are you sure want to delete this collection: ${collectionName}?`)) {
        await deleteCollectionOrDeck("collection", collectionId)
        const collectionContainer = document.getElementById('deck-collection-container')
        showCollections(collectionContainer, displayCollectionsInSidebar)

    } 
  })
}


function displayAllCollectionsInModal(container, items) {
  container.innerHTML = ""

  items.forEach(collection => {

    container.innerHTML += `<div class="showAllCollections-displayCollections-elements">
      <p>${collection.name}</p>
      <p id="removeCollectionBtn${collection.id + "_" + collection.name}">
      <p id="goToCollectionBtn">GOTOMYCOLLECTIONBUTTON</p>
      
        <span class="lock-symbol">🔒</span
        >
    </div>`
    //

    const goToCollection = document.getElementById('goToCollectionBtn')

    goToCollection.addEventListener('click', e => {
      const showAllCollectionsModal = document.querySelector('.showAllCollections-modal')
      const showCollectionByIdModal = document.querySelector('.showCollectionById-modal')
      showAllCollectionsModal.style.display = "none"
      showCollectionByIdModal.style.display = "block"
      collectionId = collection.id;
      showCollectionById(showCollectionByIdModal, displayCollectionById)
    })


    /*Remove Button til serere
    const removeCollectionBtn = document.getElementById('removeCollectionBtn' + collection.id + "_" + collection.name)
    const closeSymbol = document.createElement('span')
    closeSymbol.innerHTML = "❌"
    removeCollectionBtn.append(closeSymbol)
    closeSymbol.addEventListener('click', e => {
      $('#delete-deck-collection-modal').modal('show')
      document.getElementById('delete-deck-collection-btn').addEventListener('click', e => {
        deleteCollectionOrDeck("collection", collection.id)
      })
 
    })
    Remove Button til serere*/

  });

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
    <p>${clc.quantity}</p>
      </div> `
  }
  )
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

