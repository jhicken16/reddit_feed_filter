 import { useSelector, useDispatch } from "react-redux"
 import { useEffect, useState } from "react"
 import { selectSubscribed } from "./subscribeSlice"
 import { loadInSubreddits } from "./subscribeSlice"
 import FeedFilter from "../utilities/feedFilter/FeedFilter"
 import { addNewSubreddit } from "./subscribeSlice"
import { loadPostFromSubreddits } from "../feed/feedSlice"
import './pcTabletsubList.css'
import './mobileSublist.css'

export default function SubscribedList({filterHandler}){

    //to load differnt css files in component
    const [styleSize, setStyleSize] = useState(window.innerWidth > 750)

    const handleResize = () => {
        setStyleSize(window.innerWidth > 750)
    }
    window.addEventListener('resize', handleResize)

    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(loadInSubreddits())
    }, [])

    const filterOption = useSelector(selectSubscribed)

    //this will be called every time a new filter option is added every time a filter option adding all options to the store again need to filter out those that all ready exist  
    useEffect(() => {
  
        dispatch(loadPostFromSubreddits(Object.keys(filterOption.subReddits)))
       
    }, [filterOption.subReddits])

    const [subredditName, setSubredditName] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()
        //dispatch to subredditSlice use fetch request and create Thunk. 
        dispatch(addNewSubreddit(subredditName))
        
    }

    return (
        <>
        
        <div className={styleSize ? "largeContainer" : "smallContainer"}>
            <div className={styleSize ? "largeSublistContainer" : "smallSublistContainer"}>
                
                <div className={styleSize ? "largeFormContainer" : "smallFormContainer"}>
                    <h4>Sub-Reddits in Feed</h4>
                    <form onSubmit={handleSubmit}>
    
                        <input  placeholder="Add Subreddit"  type="text" value={subredditName} onChange={e => setSubredditName(e.target.value)} />
                        
                        <input type="submit" value="Submit" />
                    </form>
                </div>
                
                {
                    Object.values(filterOption.subReddits).map((option) => {
                        //add array to object in feedSlice with key of subreddit's end of url.
                        return <FeedFilter url={option.url} title={option.title} key={option.id} filterHandler={filterHandler}/>
                    })
                }
            </div>
        </div>
        </>
    )
}