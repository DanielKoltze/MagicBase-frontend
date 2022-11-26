const API_URL = "https://api.scryfall.com/cards/search?q=";
const API_SPACE = "%22";

let searchCardButton = document.querySelector(".searchbar-btn");

searchCardButton.addEventListener("click", searchbarInput);

function searchbarInput() {
  let searchWord = document.getElementById("searchbar-input").value;
  displayCardsInCreateCard(searchWord);
}
let addCardList = [];

/*
const cardtest = {
    apiId: "",
    name: "",
    oracleText: "",
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
    colors : "mangler"
}
*/

//Indsætter billeder i "cardpage"
async function displayCardsInCreateCard(searchWord) {
  const object = await getDataFromExternalApi(searchWord);
  const cardpageContainer = document.querySelector(".createCard-page-cardpage");
  const sidebarContainer = document.querySelector(".createCard-sideBar-card-nested");
  //clear container
  object.data.forEach((card) => {
    const cardImageDiv = document.createElement("div");
    cardImageDiv.classList.add("createCard-page-cardpage-card");
    cardImageDiv.innerHTML += `
        <div class="cardElements">
          <img class="cardImg" src="${card.image_uris.png}"alt="">
        </div>`;
    cardImageDiv.addEventListener("click", (e) => {
      //lav færdig med de elementer vi skal bruge
        let cardObject
    
         cardObject = {
          apiId: card.id,
          name: card.name,
          oracleText: card.oracle_text,
          rarity: card.rarity,
          typeLine: card.type_line,
          power: null,
          toughness: null,
          convertedManaCost: card.cmc,
          setName: card.set_name,
          euroPrice: card.prices.eur,
          imageUrl: card.image_uris.png,
          quantity: 1, //1 indtil videre da den funktionalitet ikke er lavet endnnu
          collectionId: 1, //senere lave en dropdown hvor mna kan adde kort til en specifik
      };

      if(cardObject.typeLine.includes("Creature")){
        cardObject.power = card.power
        cardObject.toughness = card.toughness
      }


      addCardList.push(cardObject);

      const sideBarCardsContainer = document.createElement("div");
      const sideBarDiv = document.createElement("div");
      const sideBarBtn = document.createElement("button");
      const sideBarBtnIcon = document.createElement("span");
      sideBarBtn.classList.add("createCard-sideBar-card-btn-remove", "material-symbols-outlined");
      sideBarBtn.classList.add("createCard-sideBar-card-btn-remove")
      sideBarBtn.innerHTML = "delete";
      sideBarBtn.style.display = "none";
      sideBarDiv.classList.add("createCard-sideBar-card-nested-text");
      sideBarCardsContainer.classList.add("createCard-sideBar-card-container");

      //-------------------Test, men slettes muligvis ikke-------------------
      const imageElement = document.createElement("img");
      const imageElementShadow = document.createElement("div");
      imageElementShadow.classList.add("createCard-sideBar-card-image-shadow");
      imageElement.src = cardObject.imageUrl;
      imageElement.classList.add("createCard-sideBar-card-background-image");
      //-------------------------Test----------------


      sideBarDiv.innerHTML = cardObject.name;

      //Viser og fjerner sletknap
      sideBarCardsContainer.onmouseover = function () {
        sideBarBtn.style.display = "block";
      };
      sideBarCardsContainer.onmouseout = function () {
        sideBarBtn.style.display = "none";
      };

      //Sletter "gemte" kort fra sidebar
      sideBarBtn.addEventListener("click", (e) => {
        sideBarCardsContainer.remove();
        addCardList.splice(cardObject, 1);
      });
      sidebarContainer.appendChild(sideBarCardsContainer);
      sideBarCardsContainer.appendChild(imageElement);
      sideBarCardsContainer.appendChild(imageElementShadow);
      sideBarCardsContainer.appendChild(sideBarDiv);
      sideBarCardsContainer.appendChild(sideBarBtn);
  
    });
    cardpageContainer.appendChild(cardImageDiv);
  });
}

//ENTER KEY klikker på søge knappen
const searchbarEnterBtn = document.getElementById("searchbar-input");
searchbarEnterBtn.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    searchbarInput();
  }
});

const submitCreateCardsBtn = document.querySelector(".createCard-sideBar-btn");

submitCreateCardsBtn.addEventListener("click", (e) => {
  addCardList.forEach(async (card) => {
        console.log(card)
    const settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(card),
    };
    console.log(settings);
    await makeRequest(BASE_URL + "/clc", settings);
  });

  addCardList = [];
  const clearContainer = document.querySelector(
    ".createCard-sideBar-card-nested"
  );
  clearContainer.innerHTML = "";
});

async function getDataFromExternalApi(searchWord) {
  const setting = {
    method: "GET",
  };
  //lav en metode som omskriver space i searchword til API_SPACE

  return await makeRequest(API_URL + searchWord, setting);
}
