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

  const cards = []
  container.innerHTML = ""
  document.getElementById('showAllCollections-title').innerHTML = "";
  
  collection.collectionLineCards.forEach(clc => {
 
       const clcElement = createClcElement(clc);
       container.appendChild(clcElement)
       cards.push(clc)
  }
  )
  contentContainerParent = document.getElementById('showAllCollections-title')
  addCardToCollectionById(contentContainerParent, collection)

  const cardImageElements = document.querySelectorAll('.cardImgShowSpecifikCard')
  addEventListenerToCardImage(cardImageElements, cards)
}


const createClcElement = clc => {
  const clcElement = document.createElement('div');
  clcElement.classList.add('showCollectionById-displayCollections-elements')
  clcElement.innerHTML = 
    `<img class="cardImg cardImgShowSpecifikCard"
     src="${clc.card.imageUrl}"
     data-toggle="modal"
     data-target="#showSpecificCard"
     id="showCardDeckId${clc.id}AndCard${clc.card.apiId}">

     <div class="cardQuantityContainer" id="card-quantity-container-${clc.card.id}">
      <span id="clc-minus-btn-${clc.id}" class="plus-minus-quantity">➖</span>
      <span id="clc-value-${clc.id}">${clc.quantity}</span>
      <span id="clc-plus-btn-${clc.id}" class="plus-minus-quantity">➕</span>
    </div>`

    const minusBtn = clcElement.querySelector(`#clc-minus-btn-${clc.id}`);
    const plusBtn = clcElement.querySelector(`#clc-plus-btn-${clc.id}`);
    const value = clcElement.querySelector(`#clc-value-${clc.id}`);
    addEventListenersToQuantityElements(minusBtn, plusBtn, value, clc);

    return clcElement;
}

const addEventListenersToQuantityElements = (minusBtn, plusBtn, value, clc) => {
  let count = clc.quantity;

  plusBtn.addEventListener('click', () => {
    count++;
    value.textContent = count;
    console.log("plus")
    console.log(count);
  }
)
  minusBtn.addEventListener('click', () => {
    count--;
    if(count < 0) {
      count = 0;
    }
    value.textContent = count;
    console.log(count);
  }
)
}


/*------------------------------DISPLAY COLLECTIONS------------------------------*/




/*
function addCardAmountEventlisteners(plusQuantityElement, minusQuantityElement, lineCard, cardQuantityValueElement) {
    let count = lineCard.quantity;

    plusQuantityElement.addEventListener('click', async e => {
    count++;
    cardQuantityValueElement.textContent = count;
    console.log("plus")
    console.log(count);
  }
  )
  minusQuantityElement.addEventListener('click', async e => {
    count--;
    if(count < 0) {
      count = 0;
    }
    cardQuantityValueElement.textContent = count;
    console.log(count);
  }
  )

}
*/


function addEventListenerToCardImage(cardImageElements, cards) {
  let color = ""
  cardImageElements.forEach((cardImg, i) => {
    cardImg.addEventListener('click', e => {
      //color
      if (cards[i].card.rarity === "common") {
        color = "grey"
      } else if (cards[i].card.rarity === "uncommon") {
        color = "green"
      } else if (cards[i].card.rarity === "rare") {
        color = "blue"
      } else if (cards[i].card.rarity === "mythic") {
        color = "#FFB300"
      }

      const specificCardContainer = document.getElementById('specificCardContainer')
      specificCardContainer.innerHTML = `
    <div class="specifikCardImgContainer">
    <img id="specificCardImg" src="${cards[i].card.imageUrl}" alt="">
      </div>
    <div style="box-shadow: inset 0 0 0 2px ${color};" class="specfikCardTextContainer">
    <h1>${cards[i].card.name}</h1>
    <div style="background:${color} ;" class="diamondSpecificCard"></div>
    </div>
    `
    })
  })
}


