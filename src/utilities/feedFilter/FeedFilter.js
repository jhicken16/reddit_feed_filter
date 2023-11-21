import './filterButtons.css'

//renders subreddit title and a button to filter the content

export default function FeedFilter({title, url, filterHandler}){

    
    //turn button into a switch button
    return (
        <div>
            <button aria-labelledby={title} onClick={() => filterHandler(url) }>filter:{ title } </button>
        </div>    
    )
}