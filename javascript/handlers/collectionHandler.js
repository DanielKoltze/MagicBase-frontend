function collection(){
    console.log("Har routet til collection")
    if(loggedInUser == null){
        window.location.href = DEFAULT_ROUTE; 
    }

}