
//take hash from url and return an object with key value pares
export default function deconstructHash(hash){

    if (hash.startsWith('?')){
        hash = hash.slice(1)
    }

    const hashKeyAndValueArray = hash.split("&")
    
    const hashObj = hashKeyAndValueArray.reduce((obj, item, index) => {
        let arr = item.split("=")
        obj[arr[0]] = arr[1]
        return obj
    }, {})
    
    return hashObj
}