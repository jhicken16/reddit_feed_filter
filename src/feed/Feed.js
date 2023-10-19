import { useSelector } from "react-redux"
import { selectFeed } from "../feed/feedSlice"
import Post from "../utilities/post.js/Post"


//This component will render the separate post from reddit api


export default function Feed(){

    const posts = useSelector(selectFeed)

    return (
        <div>
            <h2>Feed</h2>
            {
                //going to have to refactor this need to mix up the the arrays 
                Object.values(posts).map((value) => 
                    value.map(({name, content}) => 
                    <Post name={name} content={content} />
                    )
                )
            }
        </div>
    )
}