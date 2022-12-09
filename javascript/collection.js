let clcHandler = null;




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
  const data = await getCollectionById(currentPage.id)
  displayMode(container, data)
}
const addEventListener_goToCollectionBtn = (element, collectionId) => {
  element.addEventListener('click', async e => {

    await getCollectionById(collectionId)

    currentPage.type = 'collection';
    currentPage.id = collectionId;
    console.log("ID på COLLECTION: " + collectionId)
    console.log("ID på CurrentPage: " + currentPage.id)
    showCollectionById(contentContainer, displayCollectionById)
  })
}

function displayCollectionById(container, collection) {

  container.innerHTML = ""
  document.getElementById('showAllCollections-title').innerHTML = "";

  collection.collectionLineCards.forEach(clc => {

    const clcElement = createClcElement(clc);
    container.appendChild(clcElement)
    addEventListenersToQuantityElements(clc);
    addEventListenerToCardImage(clc);
  }
  )
  contentContainerParent = document.getElementById('showAllCollections-title')
  clcHandler = new LcHandler('clc');
  addCardToCollectionById(contentContainerParent, collection)

  shareDeckToUsername(collection.id, currentPage.type) //SHARE COLLECTION TO USERNAME
}


const createClcElement = clc => {
  const clcElement = document.createElement('div');
  clcElement.classList.add('showCollectionById-displayCollections-elements')
  clcElement.innerHTML =
    `<img class="cardImg" 
     id="clc-image-${clc.id}"
     src="${clc.card.imageUrl}"
     data-toggle="modal"
     data-target="#showSpecificCard">
     <div class="cardQuantityContainer" id="card-quantity-container-${clc.card.id}">
      <span id="clc-minus-btn-${clc.id}" class="plus-minus-quantity">➖</span>
      <span id="clc-value-${clc.id}">${clc.quantity}</span>
      <span id="clc-plus-btn-${clc.id}" class="plus-minus-quantity">➕</span>
    </div>`

  return clcElement;
}

const addEventListenersToQuantityElements = (clc) => {
  let count = clc.quantity;

  $(`#clc-plus-btn-${clc.id}`).click(function () {
    count++;
    $(`#clc-value-${clc.id}`).text(count)
    clcHandler.add(clc.id, clc.quantity, count);

  })

  $(`#clc-minus-btn-${clc.id}`).click(function () {
    count--;
    if (count < 0) {
      count = 0;
    }
    $(`#clc-value-${clc.id}`).text(count);
    clcHandler.add(clc.id, clc.quantity, count);
  })

}


/*------------------------------DISPLAY COLLECTIONS------------------------------*/


const addEventListenerToCardImage = (clc) => {

  let color = "";

  $(`#clc-image-${clc.id}`).click(() => {
    if (clc.card.rarity === "common") {
      color = "grey"
    } else if (clc.card.rarity === "uncommon") {
      color = "green"
    } else if (clc.card.rarity === "rare") {
      color = "blue"
    } else if (clc.card.rarity === "mythic") {
      color = "#FFB300"
    }

    showCardPopup(color, clc)

  })
}

const showCardPopup = (color, clc) => {
  $('#specificCardContainer').html(

    `<div class="specifikCardImgContainer" style="box-shadow: 0 0 10px ${color}; border-radius: 20px;">
        <img id="specificCardImg" src="${clc.card.imageUrl}" alt="">
     </div>
     <div style="box-shadow: inset 0 0 0 2px ${color};" class="specfikCardTextContainer">
        <h1>${clc.card.name}</h1>
        <div style="background:${color} ;" class="diamondSpecificCard"></div>
     </div>`
  )
}


