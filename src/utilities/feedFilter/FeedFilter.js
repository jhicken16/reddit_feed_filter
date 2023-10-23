

//renders subreddit title and a button to filter the content

export default function FeedFilter({title, filterHandler}){


    //turn button into a switch button
    return (
        <div>
            <h3>{ title }</h3>
            <button onClick={() => filterHandler(title) }>filter</button>
        </div>    
    )
}