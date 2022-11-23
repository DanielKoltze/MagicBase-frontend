

let loggedInUser = null
login()
function login(){
    document.querySelector('.loginBtn').addEventListener('click', e => {
        const username = document.querySelector('.logInUsernameInput').value
        const password = document.querySelector('.logInPasswordInput').value
        const user = getUser(username)
        user.then(userData => {
          console.log(userData)
          if(userData.password === password){
            //hvis brugernavn og password er korrekt
            loggedInUser = userData
          }else{
            //password ikke er korrekt
          }
        }).catch(error => {
            //brugeren fandtes ikke gør noget
        })
        
    })
}

 function getUser(userName){
    const settings = {
        method: 'GET',
       }
       
       return makeRequest(`${BASE_URL}/user/${userName}`, settings)
   
    }

    async function createUser(user){
        const settings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
           }, body: user
        }
        
           makeRequest(`${BASE_URL}/user`, settings)
           
    }
