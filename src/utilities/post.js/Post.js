import './post.css'
//renders the contents of the post from reddit

export default function Post({post}){
    //author, id, media, name, num_comments, subreddit, text, thumbnail, title
    return (
        <>
            <div className='post'>
                <div >
                    <h2>{post.subreddit}</h2> 
                </div>
               <div className='heading'>
                    <h3>{ post.title }</h3> <p>{post.author}</p>
               </div>
                <div>
                    <img src={post.thumbnail.thumbnail_image} alt="thumbnail" height={`${post.thumbnail.height}px`} width={`${post.thumbnail.width}px`}/> 
                </div>
                
                
                <p>{ post.text }</p>
                <p> {post.htmlText} </p>
            </div>
        </>
    )
}