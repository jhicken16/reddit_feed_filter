 import { useSelector, useDispatch } from "react-redux"
 import { useEffect, useState } from "react"
 import { selectSubscribed } from "./subscribeSlice"
 import { loadInSubreddits } from "./subscribeSlice"
 import FeedFilter from "../utilities/feedFilter/FeedFilter"
 import { addSubReddit } from "../feed/feedSlice"
 import { addNewSubreddit } from "./subscribeSlice"


import { loadPostFromSubreddits } from "../feed/feedSlice"

export default function SubscribedList({filterHandler}){

    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(loadInSubreddits())
    }, [])

    const filterOption = useSelector(selectSubscribed)

    //this will be called every time a new filter option is added every time a filter option adding all options to the store again need to filter out those that all ready exist  
    useEffect(() => {
        Object.values(filterOption.subReddits).forEach((option) => {
            dispatch(addSubReddit(option.url))
        })
        dispatch(loadPostFromSubreddits(Object.keys(filterOption.subReddits)))
       
    }, [filterOption.subReddits])

    const [subredditName, setSubredditName] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()
        //dispatch to subredditSlice use fetch request and create Thunk. 
        dispatch(addNewSubreddit(subredditName))
        console.log(subredditName)
    }

    return (
        <div>
            <h2>Subscribed Sub-Reddits</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Add Subreddit:
                    <input type="text" value={subredditName} onChange={e => setSubredditName(e.target.value)} />
                </label>
                <input type="submit" value="Submit" />
            </form>
            {
                Object.values(filterOption.subReddits).map((option) => {
                    //add array to object in feedSlice with key of subreddit's end of url.
                    return <FeedFilter url={option.url} title={option.title} key={option.id} filterHandler={filterHandler}/>
                })
            }
        </div>
    )
}