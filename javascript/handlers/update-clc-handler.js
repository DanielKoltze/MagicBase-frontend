class LcHandler {
    constructor(type) {
        this.type = type;
        this.updatedLcs = [];
    }

    add = (id, startValue, endValue) => {
        console.log('id: ' + id + ' startValue: ' + startValue + ' endValue ' + endValue)
        const indexOfLc = this.#findIndex(id);

        if (indexOfLc > -1) {
            this.updatedLcs[indexOfLc].endValue = endValue;
        }
        else {
            const lc = {
                id: id,
                startValue: startValue,
                endValue: endValue
            }
            console.log('bliver tilføjet')
            this.updatedLcs.push(lc);
        }
    }

    #findIndex = (lcId) => {

        for (let i = 0; i < this.updatedLcs.length; i++) {
            if (this.updatedLcs[i].id === lcId) {
                return i;
            }
        }
        return -1;
    }

    clear = () => {
        this.updatedLcs = []
    }
    saveChanges = async () => {

        for (const lc of this.updatedLcs) {
            if (lc.startValue != lc.endValue) {
                const updatedClc = {
                    id: lc.id,
                    quantity: lc.endValue
                }
                await this.#post(updatedClc)
            }
        }
    }
    #post = async (lc) => {
        console.log('poster')
        const settings = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(lc)
        }
        await makeRequest(`${BASE_URL}/${this.type}`, settings)
    }


}

