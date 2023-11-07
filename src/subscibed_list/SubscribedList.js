 import { useSelector, useDispatch } from "react-redux"
 import { useEffect } from "react"
 import { selectSubscribed } from "./subscribeSlice"
 import { loadInSubreddits } from "./subscribeSlice"
 import FeedFilter from "../utilities/feedFilter/FeedFilter"


export default function SubscribedList({filterHandler}){

    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(loadInSubreddits())
    }, [])


    const filterOption = useSelector(selectSubscribed)

    

    return (
        <div>
            <h2>Subscribed Sub-Reddits</h2>
            {
                filterOption.subReddits.map((option) => <FeedFilter title={option.title} key={option.id} filterHandler={filterHandler}/>)
            }
        </div>
    )
}