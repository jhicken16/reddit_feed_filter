import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    subReddits: ['rd/funny', 'rd/LITrpg', 'rd/gamming']
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
//export const selectSubscribed = (arrays that you want to return) => (state) => state.subscribed 'then reconstruct object or return state with just the arrays you need
export const selectSubscribed = (state) => state.subscribed
export const { addSubReddit } = subscribedSlice.actions
export default subscribedSlice.reducer