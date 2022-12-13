




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
      <div class="collection-name-container sidebar-name-container">
          <p>${collection.name}</p>
          </div>
          <p class="sidebar-button-container">
          <span class="lock-symbol">🔒</span>
          <span class="delete-collection-button" collection-id="${collection.id}" collection-name="${collection.name}">❌</span>
          </p>
      </div>
      `
  });

  const deleteBtnElements = document.getElementsByClassName('delete-collection-button')
  const collectionNameContainerElements = document.getElementsByClassName('collection-name-container')

  const elementListSize = deleteBtnElements.length;

  for (let i = 0; i < elementListSize; i++) {
    addEventListenerToCollectionElement(
      deleteBtnElements[i],
      deleteBtnElements[i].getAttribute('collection-id'),
      deleteBtnElements[i].getAttribute('collection-name')
    );
    addEventListener_goToCollectionBtn(
      collectionNameContainerElements[i],
      deleteBtnElements[i].getAttribute('collection-id')
    );
  }
}

const addEventListenerToCollectionElement = (element, collectionId, collectionName) => {
  element.addEventListener('click', async e => {
    if (window.confirm(`Are you sure want to delete this collection: ${collectionName}?`)) {
      await deleteCollectionOrDeck("collection", collectionId)
      const collectionContainer = document.getElementById('deck-collection-container')
      showCollections(collectionContainer, displayCollectionsInSidebar, "collection")

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
  const data = await getCollectionById(currentPage.id)
  displayMode(container, data)
}
const addEventListener_goToCollectionBtn = (element, collectionId) => {
  element.addEventListener('click', async e => {
    await getCollectionById(collectionId)

    currentPage.type = 'collection';
    currentPage.id = collectionId;
    if (window.location.href !== COLLECTION_ROUTE) {
      window.location.href = COLLECTION_ROUTE;
    }
    showCollectionById(contentContainer, displayCollectionById)
  })
}

function displayCollectionById(container, collection) {

  container.innerHTML = ""
  document.getElementById('showAllCollections-title').innerHTML = "";
  document.getElementById('showAllCollections-modal').className = "showAll-modal-byId";
  collection.collectionLineCards.forEach(clc => {
    const clcElement = createLcElement(clc);
    container.appendChild(clcElement)
    addEventListenersToQuantityElements(clc);
    addEventListenerToCardImage(clc);
  }
  )
  contentContainerParent = document.getElementById('showAllCollections-title')
  lcHandler = new LcHandler('clc');
  addCardToCollectionById(contentContainerParent, collection)
  shareDeckToUsername(collection.id, currentPage.type) //SHARE COLLECTION TO USERNAME
  addEventListenerToSpecificCollectionSearch(collection);
}

function displayCollectionByIdByList(container, collection, clcList) {

  container.innerHTML = ""
  document.getElementById('showAllCollections-title').innerHTML = "";
  document.getElementById('showAllCollections-modal').className = "showAll-modal-byId";
  clcList.forEach(clc => {
    const clcElement = createLcElement(clc);
    container.appendChild(clcElement)
    addEventListenersToQuantityElements(clc);
    addEventListenerToCardImage(clc);
  }
  )
  contentContainerParent = document.getElementById('showAllCollections-title')
  lcHandler = new LcHandler('clc');
  addCardToCollectionById(contentContainerParent, collection)
  shareDeckToUsername(collection.id, currentPage.type) //SHARE COLLECTION TO USERNAME
}