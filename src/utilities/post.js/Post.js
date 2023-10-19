
//renders the contents of the post from reddit

export default function Post({name, content}){

    return (
        <>
            <h1>{ name }</h1>
            <p>{ content }</p>
        </>
    )
}