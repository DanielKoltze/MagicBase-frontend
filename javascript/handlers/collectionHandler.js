function collection(){
    if(loggedInUser == null){
        window.location.href = DEFAULT_ROUTE; 
    }
    const template = document.getElementById('my-collection')
    const clone = template.content.cloneNode(true)


    showDecks(container, displayInSidebar)

    appDiv.replaceChildren(clone)
}