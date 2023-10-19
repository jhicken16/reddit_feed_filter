import { configureStore } from "@reduxjs/toolkit";

import feedSlice from "../feed/feedSlice";
import subscribeSlice from "../subscibed_list/subscribeSlice";

export default configureStore({
    reducer: {
        feed: feedSlice,
        subscribed: subscribeSlice
    }
})