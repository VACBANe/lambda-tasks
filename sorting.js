import axios from "axios";

//JSON сортировка
const endpoints = [
    "https://jsonbase.com/lambdajson_type1/793",
    "https://jsonbase.com/lambdajson_type1/955",
    "https://jsonbase.com/lambdajson_type1/231",
    "https://jsonbase.com/lambdajson_typ213/231" //Wrong url
]
const endpoints2 = [
    "https://jsonbase.com/lambdajson_type1/793",
    "https://jsonbase.com/lambdajson_type1/955",
    "https://jsonbase.com/lambdajson_type1/231",
    "https://jsonbase.com/lambdajson_type1/931",
    "https://jsonbase.com/lambdajson_type1/93",
    "https://jsonbase.com/lambdajson_type2/342",
    "https://jsonbase.com/lambdajson_type2/770",
    "https://jsonbase.com/lambdajson_type2/491",
    "https://jsonbase.com/lambdajson_type2/281",
    "https://jsonbase.com/lambdajson_type2/718",
    "https://jsonbase.com/lambdajson_type3/310",
    "https://jsonbase.com/lambdajson_type3/806",
    "https://jsonbase.com/lambdajson_type3/469",
    "https://jsonbase.com/lambdajson_type3/258",
    "https://jsonbase.com/lambdajson_type3/516",
    "https://jsonbase.com/lambdajson_type4/79",
    "https://jsonbase.com/lambdajson_type4/706",
    "https://jsonbase.com/lambdajson_type4/521",
    "https://jsonbase.com/lambdajson_type4/350",
    "https://jsonbase.com/lambdajson_type4/64",
    "https://jsonbase.com/lambdajson_type4324",
]
const jsonSort = async (arr) => {
    let allResponse = [];
    let trueCounter = 0, falseCounter = 0;
    for (let i = 0; i < arr.length; i++) {
        let response = await sendRequest(arr[i]);
        if(response !== undefined)
            allResponse.push(response);
    }
    const res = [];
    function finder(url, obj) {
        for( let prop in obj) {
            if(prop === "isDone") {
                res.push({
                    url,
                    "isDone": obj[prop]
                })
                obj[prop] === true ? trueCounter++ : falseCounter++
            } else {
                if(typeof obj[prop] === "object") {
                    finder(url, obj[prop])
                }
            }
        }
    }
    allResponse.forEach(item => {
        finder(item.url, item.response)
    })
    res.forEach(item => {
        console.log(`${item.url}: isDone - ${item.isDone}`)
    })
    console.log(`Значений True: ${trueCounter}`);
    console.log(`Значений False: ${falseCounter}`);
}
const sendRequest = async (url, attempts = 3) => {
    try {
        let response = await axios.get(url).then(({data}) => data)
        return {
            url,
            response
        }
    } catch (e) {
        if(attempts > 0) {
            await sendRequest(url, --attempts)
        }
        else {
            console.log(url + " error!")
        }
    }

}
jsonSort(endpoints)