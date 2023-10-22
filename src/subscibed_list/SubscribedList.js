 import { useSelector } from "react-redux"
 import { selectSubscribed } from "./subscribeSlice"

 import FeedFilter from "../utilities/feedFilter/FeedFilter"


export default function SubscribedList(){

    const filterOption = useSelector(selectSubscribed)

    const filterHandler = () => {
        console.log(filterOption)
    }

    return (
        <div>
            <h2>Subscribed Sub-Reddits</h2>
            {
                filterOption.subReddits.map((option) => <FeedFilter title={option} filterHandler={filterHandler}/>)
            }
        </div>
    )
}