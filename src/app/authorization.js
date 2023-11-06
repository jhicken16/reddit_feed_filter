import { nanoid } from "nanoid"

//https://www.reddit.com/api/v1/authorize?client_id=CLIENT_ID&response_type=TYPE&
//state=RANDOM_STRING&redirect_uri=URI&duration=DURATION&scope=SCOPE_STRING

export default function userAuthorization(uniqueIdentifier){
    const redirectIdentifier = nanoid()

    let url = 'https://www.reddit.com/api/v1/authorize?'
    url += 'client_id=_Afqy_1XVA7c10sbVeKrkg&'
    url += 'response_type=code&'
    url += 'state=' + redirectIdentifier + '&'
    url += 'redirect_uri=http://localhost:3000/page&'
    url += 'duration=temporary&'
    url += 'scope=mysubreddits read'

    window.location.href = url

    return redirectIdentifier
}