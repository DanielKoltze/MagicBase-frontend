/*------------------------------GETMAPPINGS------------------------------*/
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
/*------------------------------GETMAPPINGS------------------------------*/

/*------------------------------DELETEMAPPING------------------------------*/
async function deleteCollectionOrDeck(type, id) {
  const settings = {
    method: "DELETE",
  }
  await makeRequest(BASE_URL + "/" + type + "/" + id + "/user/" + loggedInUser.id, settings)
}
/*------------------------------DELETEMAPPING------------------------------*/

/*------------------------------SIDEBAR------------------------------*/
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
/*------------------------------SIDEBAR------------------------------*/



/*------------------------------DISPLAY COLLECTIONS------------------------------*/
async function showCollections(container, displayMode, type) {
  const collections = await getCollectionsByUserId(loggedInUser.id)
  displayMode(container, collections, type)
}
/*Show Collection by ID*/
async function showCollectionById(container, displayMode) {
  const data = await getCollectionById(selectedCollectionId)
  displayMode(container, data)
}
const addEventListener_goToCollectionBtn = (element, collectionId) => {
  element.addEventListener('click', async e => {

    await getCollectionById(collectionId)


    selectedCollectionId = collectionId
    currentPage.id = collectionId;
    console.log("ID på COLLECTION: " + collectionId)
    console.log("ID på CurrentPage: " + currentPage.id)
    showCollectionById(contentContainer, displayCollectionById)
  })
}

function displayCollectionById(container, collection) {
  container.innerHTML = ""
  document.getElementById('showAllCollections-title').innerHTML = collection.name
  collection.collectionLineCards.forEach(clc => {
    container.innerHTML += ` 
      <div class="showCollectionById-displayCollections-elements">
      <img class="cardImg" src="${clc.card.imageUrl}">
      <div class="cardQuantityContainer">
        <h1 class="cardQuantity"><span class="plus-minus-quantity">➖</span>${clc.quantity}<span class="plus-minus-quantity">➕</span></h1>
      </div>
      </div>
       `
  }
  )

  contentContainerParent = document.getElementById('showAllCollections-title')
  addCardToCollectionById(contentContainerParent, collection)
  console.log("displayCollectionById kører")
}
/*------------------------------DISPLAY COLLECTIONS------------------------------*/