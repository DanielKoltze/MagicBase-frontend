function collection(){
    console.log("Har routet til collection")
    if(loggedInUser == null){
        window.location.href = DEFAULT_ROUTE; 
    }
    const container = document.getElementById('deck-collection-container')
    showCollections(container,displayCollectionsInSidebar)

}