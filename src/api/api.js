const url = 'https://www.reddit.com'

export async function subredditGet(){
    const endOfPath = '/subreddits.json'
    
    try{
        const response = await fetch(url + endOfPath)

        if(!response.ok){
            throw new Error('failed to connect');
        }
        const data = await response.json()
        return data

    }
    catch(err){
        console.log(err)
    }
}

export async function subredditPosts(urlEnd){
    try{
        const response = await fetch(url + urlEnd)

        if(!response.ok){
            throw new Error('failed to connect')
        }
        const data = await response.json()
        return data
    }
    catch(err){
        console.log(err)
    }
}