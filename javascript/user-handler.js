

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

    async function postUser(user){
        const settings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
           }, 
           body: JSON.stringify(user) 
        }
        console.log(settings.body);
        
           makeRequest(`${BASE_URL}/user`, settings)
           
    }

    let signUpEmail = null
    let signUpPassword = null
    let signUpRepeatPassword = null
    let signUpUserName = null
    let signUpSubmitButton = null
    const signUpButton = document.getElementById("sign-up-button")

    signUpButton.addEventListener("click", createUser)

    async function createUser(){
        console.log("sign-up-knap aktiveret")
      signUpEmail = document.getElementById("sign-up-email");
      signUpPassword = document.getElementById("sign-up-password");
      signUpRepeatPassword = document.getElementById("sign-up-repeat-password");
      signUpUserName = document.getElementById("sign-up-user-name");
      signUpSubmitButton = document.getElementById("sign-up-submit-button");
      console.log(signUpSubmitButton);

      signUpSubmitButton.addEventListener("click", async (e) => {
        console.log("hello");
    

        if(await checkIfUserExsist(signUpUserName.value)){
          //besked om brugeren allered exister
        } 
        else if(signUpPassword === signUpRepeatPassword){
          const user = {
            email: signUpEmail.value,
            password: signUpPassword.value,
            username: signUpUserName.value
            
          }
          postUser(user);
        }else{
          //password og repeat password passer ikke sammen besked
        }

        
      } );
    }

    async function checkIfUserExsist(userName){
    getUser(userName).then ((user) => {
      if(user != null){
        return true;
      }
      return false;
    } )

    }
