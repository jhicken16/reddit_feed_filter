import { subredditGet } from '../api/api'


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    subReddits: [],
    isLoadingSubreddits: false,
    failedToLoadSubreddits: false,

}

export const loadInSubreddits = createAsyncThunk(
    'subscribed/loadInSubreddits',
    async() => {
        const response = await subredditGet()
        return await response 
    }
)

const subscribedSlice = createSlice({
    name: 'subscribed',
    initialState,
    reducers: {
        addSubReddit: (state, action) => {
            state.subReddits.push(action.payload.subReddit)
        }
    },
    extraReducers: {
        [loadInSubreddits.pending]: (state) => {
            state.isLoadingSubreddits = true
            state.failedToLoadSubreddits = false
        },
        [loadInSubreddits.rejected]: (state) => {
            state.isLoadingSubreddits = false
            state.failedToLoadSubreddits = true
        },
        [loadInSubreddits.fulfilled]: (state, action) => {
            state.isLoadingSubreddits = false
            state.failedToLoadSubreddits = false
            console.log(action.payload.data.children)
            const newArr = action.payload.data.children.map((item) => {
                return {
                    id: item.data.id,
                    title: item.data.title,
                    name: item.data.name,
                    url: item.data.url
                }
            })
            state.subReddits.push(...newArr)
        }
    }
})

export const selectSubscribed = (state) => state.subscribed
export const { addSubReddit } = subscribedSlice.actions
export default subscribedSlice.reducer