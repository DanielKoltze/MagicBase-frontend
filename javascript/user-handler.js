

 async function getUser(userName){
    const settings = {
        method: 'GET',
       }
    makeRequest(`${BASE_URL}/user/${userName}`, settings)
    .then(
        (user) => {
            return user;
        }
    )
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
