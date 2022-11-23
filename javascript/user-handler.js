

let loggedInUser = null
login()
function login(){
    document.querySelector('.loginBtn').addEventListener('click', async (e) => {
        const username = document.querySelector('.logInUsernameInput').value
        const password = document.querySelector('.logInPasswordInput').value
        const user = await getUser(username)
        console.log(user);
        
    })
}


async function getUser(userName){
    const settings = {
        method: 'GET',
       }
       
       const user = await makeRequest(`${BASE_URL}/user/${userName}`, settings)
       return user;
       
   
    }

    async function postUser(user){
        console.log("postUser bliver akt")
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
    
        userExists = await checkIfUserExsist(signUpUserName.value)

        if(userExists){
            return
          //besked om brugeren allered exister
        } 
        else if(signUpPassword.value === signUpRepeatPassword.value){
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
    user = await getUser(userName);
    console.log("in checkIfUserExists " + user)
      if(user === null){
        return false;
      }
      return true;
     

    }

    
    