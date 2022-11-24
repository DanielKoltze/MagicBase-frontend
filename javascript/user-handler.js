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
    console.log(user)
    console.log(password)
    console.log(user.password)
    const loginMessage = document.querySelector('.login-message')
    if (user.password === password) {
      //bruger eksisterer og kode korrekt
      loggedInUser = user
      const LogInModal = document.getElementById('LogInModal')
      console.log(LogInModal)


      /*
      LogInModal.classList.remove('show')
      LogInModal.style.paddingRight = '0px'
      LogInModal.style.paddingRight = ('')
      LogInModal.setAttribute('aria-hidden',"true")
      LogInModal.removeAttribute('aria-modal')
      LogInModal.style.display = 'none' 

      const loginBtn = document.getElementById('loginBtn')
  */
      console.log("korrekt")
    } else {
      //bruger findes allerede i databasen
      console.log("brugeren findes ikke")
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

  makeRequest(`${BASE_URL}/user`, settings);
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
      errorMessage.textContent= "The user allredy exist. please try another username."
      console.log("brugeren eksisterer allerede");
      return;
    } else if (signUpPassword.value === signUpRepeatPassword.value) {
      const user = {
        email: signUpEmail.value,
        password: signUpPassword.value,
        username: signUpUserName.value,
      };

      postUser(user);

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
