

//renders subreddit title and a button to filter the content

export default function FeedFilter({title}){

    const filterHandler = () => {

    }

    return (
        <div>
            <h3>{ title }</h3>
            <button onClick={ filterHandler }>filter</button>
        </div>    
    )
}