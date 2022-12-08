class ClcHandler{
    constructor(){
        this.updatedClcs = [];
    }

add = (id, startValue, endValue) => {
    console.log('id: ' + id + ' startValue: ' + startValue + ' endValue ' + endValue)
    const indexOfClc = this.#findIndex(id);

    if (indexOfClc > -1) {
        this.updatedClcs[indexOfClc].endValue = endValue;
    }
    else {
        const clc = {
            id: id,
            startValue: startValue,
            endValue: endValue
        }
        console.log('bliver tilføjet')
        this.updatedClcs.push(clc);
    }
}

#findIndex = (clcId) => {

    for(let i = 0; i < this.updatedClcs.length; i++) {
        if (this.updatedClcs[i].id === clcId) {
            return i;
        }
    }
    return -1;
}

clear = () => {
    this.updatedClcs = []
}
saveChanges = async () => {

    for (const clc of this.updatedClcs) {
        if (clc.startValue != clc.endValue) {
            const updatedClc = {
                id: clc.id,
                quantity: clc.endValue   
            }
            await this.#post(updatedClc)
        }
    }  
}
#post = async (clc) => {
    console.log('poster')
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

