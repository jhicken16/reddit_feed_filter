import { useSelector } from "react-redux"
import { selectFeed } from "../feed/feedSlice"
import Post from "../utilities/post.js/Post"
import { useDispatch } from "react-redux"
import { loadExtraPosts } from "../feed/feedSlice"
//This component will render the separate post from reddit api


export default function Feed({filter}){
    //apply filter values to selecter return array that match names
    const posts = useSelector(selectFeed(filter))

    const dispatch = useDispatch()

    function loadMorePostHandler(){
        dispatch(loadExtraPosts(filter))
    }

    console.log(posts)
    return (
        <div>
            <h2>Feed</h2>
            {
                //going to have to refactor this need to mix up the the arrays 
                Object.values(posts).map((value) => 
                    value.map((post) => {
                    //give key
                    return <Post post={post} key={post.id}/>
                    })
                )
            }
            <button onClick={loadMorePostHandler} >Load more post</button> 
        </div>
    )
}