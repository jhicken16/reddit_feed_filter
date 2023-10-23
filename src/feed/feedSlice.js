import { createSlice } from '@reduxjs/toolkit'

//A slice for all the post fetch from reddit api, main contant stored in array  of objects.

//this is just stand in content each array will link to posts from seperate subscribed subreddits 
const initialState = {
    funny: [{name: 'r/funny', content: 'My training as a bin man was super easy could just pick it up as i went along'}],
    LITrpg: [{name: 'r/LITrpg', content: 'New book breads and beer, check it out now'}],
    gamming: [{name: 'r/gamming', content: 'battle bit is a big hit'}]
}

const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        addSubReddit: ( state, action ) => {
            //this assuming post get returned in an array. 
            state[action.payload.name] = action.payload.post
        },
        addPostToSubReddit: (state, action) => {
            state[action.name].push(state.payload)
        }
    }
})


//export const selectSubscribed = (arrays that you want to return) => (state) => state.subscribed 'then reconstruct object or return state with just the arrays you need
export const selectFeed = (arrayOfValuesToGet) => (state) => Object.values(state.feed).filter((item) => {
    console.log(item)
    console.log(!arrayOfValuesToGet.includes(item[0].name))
    return !arrayOfValuesToGet.includes(item[0].name)
    })
export const { addSubReddit, addPostToSubReddit} = feedSlice.actions
export default feedSlice.reducer