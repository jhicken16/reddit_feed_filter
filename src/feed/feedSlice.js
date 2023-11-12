import { subredditPosts } from '../api/api'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

//A slice for all the post fetch from reddit api, main contant stored in array  of objects.

//this is just stand in content each array will link to posts from seperate subscribed subreddits 
const initialState = {
    subredditPost: {},
    postsLoading: false,
    failedToLoadPost: false
}

//This will need to be refactored 
//If one Promise fails they all fail
//have to wait for all async function to finish before you can start loading them in 
export const loadPostFromSubreddits = createAsyncThunk(
    "feed/loadPostFromSubreddits",
    async (endOfURL) => {
        if(Array.isArray(endOfURL)){
            const arrayOfResponses = await Promise.all(endOfURL.map((item) => {
                return new Promise(resolve =>  setTimeout( async () => {
                    resolve(await subredditPosts(item)) 
                }, 1000))
            }))
            return arrayOfResponses
        }
        const response = await subredditPosts(endOfURL)
        return await response
    }
)

export const loadExtraPosts = createAsyncThunk(
    "feed/LoadExtraPost",
    async (arrayOfPostNOtToGet, {getState}) => {
        const state = getState()
        const subredditPostKeys = Object.keys(state.feed.subredditPost)
        console.log(state)
        console.log(subredditPostKeys)

        const arrayOfResponses = await Promise.all(subredditPostKeys
            .filter(subredditsName => !arrayOfPostNOtToGet.includes(subredditsName))
            .map((subredditsName) => {
                return new Promise(resolve => setTimeout( async () => {
                        console.log(state.feed.subredditPost)
                        //temp test call initial post request
                        resolve(await subredditPosts(subredditsName, state.feed.subredditPost[subredditsName][state.feed.subredditPost[subredditsName].length-1].name ))  
                }, 1000))
        }))
        
        return arrayOfResponses
    }
)

const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        addSubReddit: ( state, action ) => {
            //this assuming post get returned in an array.
            state.subredditPost[action.payload] = []
        },
        //this needs to be refactored
        addPostToSubReddit: (state, action) => {
            state[action.name].push(state.payload)
        }
    },
    extraReducers: {
        [loadPostFromSubreddits.pending]: (state) => {
            state.postsLoading = true
            state.failedToLoadPost = false
        },
        [loadPostFromSubreddits.rejected]: (state) => {
            state.postsLoading = false
            state.failedToLoadPost = true
        },
        [loadPostFromSubreddits.fulfilled]: (state, action) => {
            state.postsLoading = false
            state.failedToLoadPost = false
            console.log('feed action payload', action)
            action.payload.forEach((item) => {
                item.data.children.forEach((post) => {
                    state.subredditPost[`/${post.data.subreddit_name_prefixed}/`].push({
                        id: post.data.id,
                        media: post.data.media,
                        name: post.data.name,
                        num_comments: post.data.num_comments,
                        test: post.data.selftext,
                        thumbnail: {
                            thumbnail_image: post.data.thumbnail,
                            thumbnail_height: post.data.thumbnail_height,
                            thumbnail_width: post.data.thumbnail_width
                        },
                        subreddit: post.data.subreddit_name_prefix,
                        title: post.data.title,
                        author: post.data.author
                    })
                    
                })
                
            })
        },
        [loadExtraPosts.pending]: (state) => {
            state.postsLoading = true
            state.failedToLoadPost = false
        },
        [loadExtraPosts.rejected]: (state) => {
            state.postsLoading = false
            state.failedToLoadPost = true
        },
        //refactor this into function so you dont repeate yourself
        [loadExtraPosts.fulfilled]: (state, action) => {
            state.postsLoading = false
            state.failedToLoadPost = false
            console.log('feed action payload', action)
            action.payload.forEach((item) => {
                item.data.children.forEach((post) => {
                    state.subredditPost[`/${post.data.subreddit_name_prefixed}/`].push({
                        id: post.data.id,
                        media: post.data.media,
                        name: post.data.name,
                        num_comments: post.data.num_comments,
                        test: post.data.selftext,
                        thumbnail: {
                            thumbnail_image: post.data.thumbnail,
                            thumbnail_height: post.data.thumbnail_height,
                            thumbnail_width: post.data.thumbnail_width
                        },
                        subreddit: post.data.subreddit_name_prefix,
                        title: post.data.title,
                        author: post.data.author
                    })
                    
                })
                
            })
        }
    }
})


//export const selectSubscribed = (arrays that you want to return) => (state) => state.subscribed 'then reconstruct object or return state with just the arrays you need
export const selectFeed = (arrayOfValuesToGet) => (state) => {
    const obj = {}
    for (let key in state.feed.subredditPost){
        if(!arrayOfValuesToGet.includes(key)){
            obj[key] = state.feed.subredditPost[key]
        }
    }
    return obj
}
export const { addSubReddit, addPostToSubReddit} = feedSlice.actions
export default feedSlice.reducer