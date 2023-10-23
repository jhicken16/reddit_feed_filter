import { useSelector } from "react-redux"
import { selectFeed } from "../feed/feedSlice"
import Post from "../utilities/post.js/Post"


//This component will render the separate post from reddit api


export default function Feed({filter}){
    //apply filter values to selecter return array that match names
    const posts = useSelector(selectFeed(filter))
    console.log(posts)
    return (
        <div>
            <h2>Feed</h2>
            {
                //going to have to refactor this need to mix up the the arrays 
                posts.map((value) => 
                    value.map(({name, content}) => 
                    <Post name={name} content={content} />
                    )
                )
            }
        </div>
    )
}