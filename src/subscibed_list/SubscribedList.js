 import { useSelector } from "react-redux"
 import { selectSubscribed } from "./subscribeSlice"

 import FeedFilter from "../utilities/feedFilter/FeedFilter"


export default function SubscribedList({filterHandler}){

    const filterOption = useSelector(selectSubscribed)

    return (
        <div>
            <h2>Subscribed Sub-Reddits</h2>
            {
                filterOption.subReddits.map((option) => <FeedFilter title={option} filterHandler={filterHandler}/>)
            }
        </div>
    )
}