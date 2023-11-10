

//renders subreddit title and a button to filter the content

export default function FeedFilter({title, url, filterHandler}){

    
    //turn button into a switch button
    return (
        <div>
            <h3 id={title}>{ title }</h3>
            <button aria-labelledby={title} onClick={() => filterHandler(url) }>filter</button>
        </div>    
    )
}