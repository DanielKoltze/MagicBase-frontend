const createCollectionBtn = document.getElementById("create-collection-btn");

createCollectionBtn.addEventListener("click", async (e) => {
  const nameInput = document.getElementById("createCollectionNameInput").value;
  const descriptionInput = document.getElementById(
    "createCollectionDescriptionInput"
  ).value;
  const formatTypeInput = document.getElementById(
    "createCollectionTypeInput"
  ).value;

  const collection = {
    name: nameInput,
    description: descriptionInput,
    type: formatTypeInput,
    userId: loggedInUser.id,
  };

  const settings = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(collection),
  };
  await makeRequest(BASE_URL + "/collection", settings);

  const collectionContainer = document.getElementById(
    "deck-collection-container"
  );
  showCollections(collectionContainer, displayCollectionsInSidebar);
});
