
//renders the contents of the post from reddit

export default function Post({post}){
    //author, id, media, name, num_comments, subreddit, text, thumbnail, title
    console.log(post)
    return (
        <>
            <div>
                <h2>{post.subreddit}</h2>
                <img src={post.thumbnail.thumbnail_image} alt=""/> 
                <h3>{ post.title }</h3>
                <p>{ post.author }</p>
            </div>
        </>
    )
}