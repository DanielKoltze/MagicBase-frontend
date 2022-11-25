function collection(){
    console.log("Har routet til collection")
    if(loggedInUser == null){
        window.location.href = DEFAULT_ROUTE; 
    }
    
    const template = document.getElementById('my-collection')
    const clone = template.content.cloneNode(true)
    
    sidebarDeckContainer = document.getElementById('container');
    showDecks(sidebarDeckContainer, displayInSidebar)

}