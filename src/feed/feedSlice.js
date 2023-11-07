import { createSlice } from '@reduxjs/toolkit'

//A slice for all the post fetch from reddit api, main contant stored in array  of objects.

//this is just stand in content each array will link to posts from seperate subscribed subreddits 
const initialState = {}

const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        addSubReddit: ( state, action ) => {
            //this assuming post get returned in an array.
            console.log(action) 
            state[action.payload] = []
        },
        addPostToSubReddit: (state, action) => {
            state[action.name].push(state.payload)
        }
    }
})


//export const selectSubscribed = (arrays that you want to return) => (state) => state.subscribed 'then reconstruct object or return state with just the arrays you need
export const selectFeed = (arrayOfValuesToGet) => (state) => {
    const obj = {}
    for (let key in state.feed){
        if(!arrayOfValuesToGet.includes(key)){
            obj[key] = state.feed[key]
        }
    }
    return obj
}
export const { addSubReddit, addPostToSubReddit} = feedSlice.actions
export default feedSlice.reducer