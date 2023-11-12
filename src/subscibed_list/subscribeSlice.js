import { subredditGet } from '../api/api'


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    subReddits: {},
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
    extraReducers: (builder) => {
        builder
            .addCase(loadInSubreddits.pending, (state) => {
                state.isLoadingSubreddits = true
                state.failedToLoadSubreddits = false
            })
            .addCase(loadInSubreddits.rejected, (state) => {
                state.isLoadingSubreddits = false
                state.failedToLoadSubreddits = true
            })
            .addCase(loadInSubreddits.fulfilled, (state, action) => {
                state.isLoadingSubreddits = false
                state.failedToLoadSubreddits = false
                
                action.payload.data.children.forEach((item) => {
                    
                    state.subReddits[item.data.url] = {
                        id: item.data.id,
                        title: item.data.title,
                        name: item.data.name,
                        url: item.data.url
                    }
                })
            })
    }
})

export const selectSubscribed = (state) => state.subscribed
export const { addSubReddit } = subscribedSlice.actions
export default subscribedSlice.reducer