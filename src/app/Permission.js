import userAuthorization from "./authorization"

export default function Permission({uniqueIdentifier}){



    return (
        <div>
            <button onClick={() => userAuthorization(uniqueIdentifier)}>Grant permission</button>
        </div>
    )
}