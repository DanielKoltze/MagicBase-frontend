let signUpEmail = null;
let signUpPassword = null;
let signUpRepeatPassword = null;
let signUpUserName = null;
let signUpSubmitButton = null;

const signUpButton = document.getElementById("sign-up-button");
signUpButton.addEventListener("click", createUser);

let loggedInUser = null;
login();
function login() {
  document.querySelector(".loginBtn").addEventListener("click", async (e) => {
    const username = document.querySelector(".logInUsernameInput").value;
    const password = document.querySelector(".logInPasswordInput").value;


    const user = await getUser(username);
    const loginMessage = document.querySelector('.login-message')

    if (user.password === password) {
      //bruger eksisterer og kode korrekt
      loggedInUser = user
      const LogInModal = document.getElementById('LogInModal')
      initLogin()

      //window.location.href = 'ikke defineret'; 
    } else {
      //bruger findes allerede i database
      loginMessage.innerHTML = "Username or password is incorrect"
      loginMessage.style.display = "block"
    }


  });
}

async function getUser(userName) {
  const settings = {
    method: "GET",
  };

  const user = await makeRequest(`${BASE_URL}/user/${userName}`, settings);
  return user;
}
async function postUser(user) {

  const settings = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };

   return addedUser = await makeRequest(`${BASE_URL}/user`, settings);
   
}


async function createUser() {
  signUpEmail = document.getElementById("sign-up-email");
  signUpPassword = document.getElementById("sign-up-password");
  signUpRepeatPassword = document.getElementById("sign-up-repeat-password");
  signUpUserName = document.getElementById("sign-up-user-name");
  signUpSubmitButton = document.getElementById("sign-up-submit-button");

  signUpSubmitButton.addEventListener("click", async (e) => {
    const passwordInput = signUpPassword.value;
    const repeatedPasswordInput = signUpRepeatPassword.value;
    const errorMessage = document.getElementById("error-message")

    if (passwordInput != repeatedPasswordInput) {
      // besked om at passwords ikke matcher
      errorMessage.textContent= "Your passwords do not match!"
      
      console.log("passwords matcher ikke");
      return;
    }

    userExists = await checkIfUserExsist(signUpUserName.value);
    if (userExists) {
      // besked om, at brugeren allerede ekstisterer
      errorMessage.textContent= "The user already exist. Please try another username."
      console.log("brugeren eksisterer allerede");
      return;
    } else if (signUpPassword.value === signUpRepeatPassword.value) {
      const user = {
        email: signUpEmail.value,
        password: signUpPassword.value,
        username: signUpUserName.value,
      };



       const addedUser = await postUser(user);

      loggedInUser = addedUser
      console.log(addedUser)
      initLogin()
      //window.location.href = 'ikke defineret';
    }
  });
}



async function checkIfUserExsist(userName) {
  let response = await getUser(userName);

  if (response.httpStatus === "NOT_FOUND") {
    return false;
  }
  return true;
}


const logOutButton = document.querySelector('.dropdown-content-btn-logout')
const loginButton = document.querySelector('.dropdown-content-btn-login')

function initLogin(){

    sidebarButton.style.display = "block"
    loginButton.style.display = "none"
    signUpButton.style.display = "none"
    logOutButton.style.display = "block"
    window.location.href = DEFAULT_ROUTE + COLLECTION_ROUTE
    
}
logOutButton.addEventListener('click', logOut)

function logOut(){
  loggedInUser = null

  sidebarButton.style.display = "none"
  loginButton.style.display = "block"
  signUpButton.style.display = "block"
  logOutButton.style.display = "none"


  if(isClosed === false){
    sideBar.classList.remove('sidebar-open')
    navBar.classList.remove('navBar-open')
    leftNav.classList.remove('leftNav-open')
    sideBar.classList.add('sidebar-close')
    navBar.classList.add('navBar-close')
    leftNav.classList.add('leftNav-close')
    isClosed = true
  }
  window.location.href = DEFAULT_ROUTE
}