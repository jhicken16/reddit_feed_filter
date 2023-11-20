import './post.css'
import Markdown from 'https://esm.sh/react-markdown@9'
//renders the contents of the post from reddit

export default function Post({post}){
    console.log(post)
    //author, id, media, name, num_comments, subreddit, text, thumbnail, title

    const handleImageLoadError = (event) => {
        event.target.src = '/image-unavailable.webp'
    }

    return (
        <>
            <div className='post'>
                <div >
                    <h2>{post.subreddit}</h2> 
                </div>
               <div className='heading'>
                    <h3>{ post.title }</h3> <p>{post.author}</p>
               </div>
                <div className='imgContainer'>
                    {post.thumbnail.thumbnail_image.includes("/") && <img src={post.thumbnail.thumbnail_image} 
                        alt="thumbnail" 
                        height={`${post.thumbnail.height}em`} 
                        width={`${post.thumbnail.width}em`}
                        onError={handleImageLoadError}/>
                    } 
                </div>
                <Markdown>{post.text}</Markdown>            

            </div>
        </>
    )
}