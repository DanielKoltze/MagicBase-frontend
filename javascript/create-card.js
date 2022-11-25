const API_URL = "https://api.scryfall.com/cards/search?q=";
const API_SPACE = "%22";

let searchCardButton = document.querySelector(".searchbar-btn");

searchCardButton.addEventListener("click", searchbarInput);

function searchbarInput() {
    let searchWord = document.getElementById("searchbar-input").value;
    displayCardsInCreateCard(searchWord)
}
const addCardList = []



/*
const cardtest = {
    apiId: "",
    name: "",
    description: "",
    rarity: "",
    power: "",
    typeline: "",
    toughness: "",
    convertedManaCost: "",
    setName: "",
    euroPrice: "",
    image: "",
    collectionId: "",
    quantity: "1"
}
*/

//Indsætter billeder i "cardpage"
async function displayCardsInCreateCard(searchWord) {
  const object = await getDataFromExternalApi(searchWord);
  const cardpageContainer = document.querySelector(".createCard-page-cardpage");
  const sidebarContainer = document.querySelector('.createCard-sideBar-card-nested')
  //clear container
    object.data.forEach((card) => {
        const cardImageDiv = document.createElement('div')
        cardImageDiv.classList.add('createCard-page-cardpage-card')
        cardImageDiv.innerHTML += `
        <div class="cardElements">
          <img class="cardImg" src="${card.image_uris.png}"alt="">
        </div>`;
        cardImageDiv.addEventListener('click', e => {
            //lav færdig med de elementer vi skal bruge
            const cardObject = {name:card.name}
            addCardList.push(cardObject)
            const sideBarDiv = document.createElement('div')
            const sideBarName = document.createElement('div')
            const sideBarBtn = document.createElement('button')
            sideBarBtn.classList.add('createCard-sideBar-card-btn-remove')
            sideBarBtn.innerHTML = '❌'
            sideBarDiv.classList.add('createCard-sideBar-card-nested-text')
            sideBarDiv.innerHTML = cardObject.name;
            sideBarBtn.addEventListener('click', e => {
                sideBarDiv.remove()
                addCardList.splice(cardObject, 1);
                console.log(addCardList)
            })
            sidebarContainer.appendChild(sideBarDiv)
            sideBarDiv.appendChild(sideBarName)
            sideBarDiv.appendChild(sideBarBtn)
        })
        cardpageContainer.appendChild(cardImageDiv)
  });
}




async function getDataFromExternalApi(searchWord) {
  const setting = {
    method: "GET",
  };
  //lav en metode som omskriver space i searchword til API_SPACE

  return await makeRequest(API_URL + searchWord, setting);
}


