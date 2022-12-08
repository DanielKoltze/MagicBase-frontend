class ClcHandler{
    constructor(){
        this.updatedClcs = [];
    }

add = (id, startValue, endValue) => {
    this.updatedClcs.forEach(oldClc => {
        if(id == oldClc.id){
            oldClc.endValue = endValue
            return
        }
    })
    const clc = {
        id: id,
        startValue: startValue,
        endValue: endValue
    }
    this.updatedClcs.push(clc);
}
clear = () => {
    this.updatedClcs = []
}
saveChanges = async () => {
     this.updatedClcs.forEach(async clc =>{
        
        if (clc.startValue != clc.endValue) {
            const updatedClc = {
                id: clc.id,
                quantity: clc.endValue   
            }
            await this.post(updatedClc)
        }
        
    })

    //display function
    
}
post = async (clc) => {
    const settings = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(clc)
    }
    await makeRequest(`${BASE_URL}/clc`, settings)
}


}

