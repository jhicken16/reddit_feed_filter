import Nav from "../utilities/nav/Nav"

import { Outlet } from "react-router-dom"

export default function Root(){
    return (
        <>
            <Nav />
            <main>
                <Outlet/>
            </main>
        </>
    )
}