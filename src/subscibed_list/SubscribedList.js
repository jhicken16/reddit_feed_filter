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

    useEffect(() => {
        // const test = async () => {
        //     const response =  await subredditPosts('/r/Home/')
        //     const data = await response
        //     console.log(data)
        // }
        // test()
        console.log(filterOption.subReddits)
        dispatch(loadPostFromSubreddits(Object.keys(filterOption.subReddits)))
        Object.values(filterOption.subReddits).map((option) => dispatch(addSubReddit(option))        )
    }, [filterOption.subReddits])

    return (
        <div>
            <h2>Subscribed Sub-Reddits</h2>
            {
                Object.values(filterOption.subReddits).map((option) => {
                    //add array to object in feedSlice with key of subreddit's end of url.
                    dispatch(addSubReddit(option))
                    //dispatch(loadPostFromSubreddits(option.url))
                    return <FeedFilter title={option.title} key={option.id} filterHandler={filterHandler}/>
                })
            }
        </div>
    )
}