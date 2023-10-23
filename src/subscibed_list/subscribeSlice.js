import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    subReddits: ['r/funny', 'r/LITrpg', 'r/gamming']
}

const subscribedSlice = createSlice({
    name: 'subscribed',
    initialState,
    reducers: {
        addSubReddit: (state, action) => {
            state.subReddits.push(action.payload.subReddit)
        }
    }
})

export const selectSubscribed = (state) => state.subscribed
export const { addSubReddit } = subscribedSlice.actions
export default subscribedSlice.reducer