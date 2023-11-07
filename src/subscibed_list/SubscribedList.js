 import { useSelector, useDispatch } from "react-redux"
 import { useEffect } from "react"
 import { selectSubscribed } from "./subscribeSlice"
 import { loadInSubreddits } from "./subscribeSlice"
 import FeedFilter from "../utilities/feedFilter/FeedFilter"
 import { addSubReddit } from "../feed/feedSlice"

import { subredditPosts } from "../api/api"

export default function SubscribedList({filterHandler}){

    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(loadInSubreddits())

        const test = async () => {
            const response = await subredditPosts("/r/Home/.json")
            console.log("the test", response)
        }
        test()
    }, [])

//     "2qs0k"
// title(pin):"Home"
// name(pin):"t5_2qs0k"
// url(pin):"/r/Home/"

    const filterOption = useSelector(selectSubscribed)

    

    return (
        <div>
            <h2>Subscribed Sub-Reddits</h2>
            {
                Object.values(filterOption.subReddits).map((option) => {
                    //add array to object in feedSlice with key of subreddit's end of url.
                    dispatch(addSubReddit(option.url))
                    return <FeedFilter title={option.title} key={option.id} filterHandler={filterHandler}/>
                })
                
            }
        </div>
    )
}