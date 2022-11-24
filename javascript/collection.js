async function getCollectionsByUserId(userId){
    const settings = {
        method: "GET",
      };
    const collections = await makeRequest(BASE_URL + '/collection/user/' + userId, settings); 
    return collections;
}