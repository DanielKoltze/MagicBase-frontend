let selectedCollectionId = null;

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
  const collections = await getCollectionsByUserId(loggedInUser.id)
  displayMode(container, collections)

}

function displayCollectionsInSidebar(container, items) {
  //const container = document.getElementById('deck-collection-container')
  container.innerHTML = ""
  console.log(items);
  items.forEach(collection => {
    container.innerHTML += `
      <div class="deck-collection-element-container">
          <p>${collection.name}</p>
          <p id="removeCollectionBtn${collection.id + "_" + collection.name}">
          <span class="lock-symbol">🔒</span>
          <span class="delete-collection-button" collection-id="${collection.id}" collection-name="${collection.name}">❌</span>
      </div>
      `
  });

  const deleteBtnElements = document.getElementsByClassName('delete-collection-button')

  for (let i = 0; i < deleteBtnElements.length; i++) {
    addEventListenerToCollectionElement(
      deleteBtnElements[i],
      deleteBtnElements[i].getAttribute('collection-id'),
      deleteBtnElements[i].getAttribute('collection-name')
    )
  }


}
const addEventListenerToCollectionElement = (element, collectionId, collectionName) => {
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
    container.innerHTML += `
    <div class="showAll-display-elements" collection-id="${collection.id}">
      <h1 class="showAll-display-elements-name">${collection.name}</h1>
      <h5 class="showAll-display-elements-description">${collection.description}</h5>
      </div>`
    console.log(collection)
    console.log("Collection id: " + collection.id)
  });

  const goToCollectionBtn = document.getElementsByClassName('showAll-display-elements')

  for (let i = 0; i < goToCollectionBtn.length; i++) {
    addEventListener_goToCollectionBtn(
      goToCollectionBtn[i],
      goToCollectionBtn[i].getAttribute('collection-id'),
    )
  }
}

const addEventListener_goToCollectionBtn = (element, collectionId) => {
  element.addEventListener('click', async e => {
    await getCollectionById(collectionId)

    console.log("ID på hvad jeg trykker på: " + collectionId)
    selectedCollectionId = collectionId


    showCollectionById(contentContainer, displayCollectionById)
  })
}

/*Show Collection by ID*/
async function showCollectionById(container, displayMode) {
  const data = await getCollectionById(selectedCollectionId)
  displayMode(container, data)
}

function displayCollectionById(container, collection) {
  container.innerHTML = ""
  collection.collectionLineCards.forEach(clc => {
    container.innerHTML += ` 
    <button class="addCardButton-collection" collection-id="${collection.id}">Add Card</button>
      <div class="showCollectionById-displayCollections-elements">
      <img class="cardImg" src="${clc.card.imageUrl}">
    <p>There are: ${clc.quantity} of this card</p>
      </div> `
  }

  )
  const addCardBtn = document.querySelector('.addCardButton-collection')
  addCardBtn.addEventListener('click', async e => {
    const createCard_modal = document.querySelector('.createCard-modal');
    createCard_modal.style.display = "block";

  })

  console.log("addCardToColleciton kører")
  console.log("displayCollectionById kører")
}



/*Show Collection by ID*/
async function deleteCollectionOrDeck(type, id) {
  const settings = {
    method: "DELETE",
  }

  await makeRequest(BASE_URL + "/" + type + "/" + id + "/user/" + loggedInUser.id, settings)

}



