 import { useSelector, useDispatch } from "react-redux"
 import { useEffect } from "react"
 import { selectSubscribed } from "./subscribeSlice"
 import { loadInSubreddits } from "./subscribeSlice"
 import FeedFilter from "../utilities/feedFilter/FeedFilter"
 import { addSubReddit } from "../feed/feedSlice"


import { loadPostFromSubreddits } from "../feed/feedSlice"
import { subredditPosts } from "../api/api"


export default function SubscribedList({filterHandler}){

    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(loadInSubreddits())
    }, [])

    const filterOption = useSelector(selectSubscribed)

    //this will be called every time a new filter option is added every time a filter option adding all options to the store again need to filter out those that all ready exist  
    useEffect(() => {
        Object.values(filterOption.subReddits).forEach((option) => {
            console.log(option)
            dispatch(addSubReddit(option.url))
        })
        dispatch(loadPostFromSubreddits(Object.keys(filterOption.subReddits)))
       
    }, [filterOption.subReddits])

    return (
        <div>
            <h2>Subscribed Sub-Reddits</h2>
            {
                Object.values(filterOption.subReddits).map((option) => {
                    //add array to object in feedSlice with key of subreddit's end of url.
                    console.log(option)
                    return <FeedFilter url={option.url} title={option.title} key={option.id} filterHandler={filterHandler}/>
                })
            }
        </div>
    )
}