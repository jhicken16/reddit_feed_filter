import { async } from "q";

const url = 'https://www.reddit.com'

export async function subredditGet(){
    //https://www.reddit.com/r/{subreddit}/about.json

    const endOfPath = '/subreddits.json'
    
    try{
        const response = await fetch(url + endOfPath + "?limit=5")

        if(!response.ok){
            throw new Error('failed to connect');
        }
        const data = await response.json()
        
        return data

    }
    catch(err){
        
        throw err
    }
}

export async function newSubreddit(subredditName){
    
    const endPoint = url + `/r/${subredditName}/about.json`

    try{
        const response = await fetch(endPoint)

        if(!response.ok){
            throw new Error('failed to load content')
        }
        const data = await response.json()
        
        return data

    }
    catch(err){
        
        throw err
    }
}

export async function subredditPosts(urlEnd, afterPost){  
    let address = url +  urlEnd + ".json" 
    if(afterPost === undefined){
        address += '?limit=3'
    }
    else{
        address += `?limit=3&after=${afterPost}`
    }
    
    try{
        const response = await fetch(address)
        if(!response.ok){
            throw new Error('failed to connect')
        }
        const data = await response.json()
        
        return data
    }
    catch(err){
        throw err
    }
}