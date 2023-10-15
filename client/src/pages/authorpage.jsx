import React from "react";
import Navbar from "../components/navbar";
import Author from "../components/search";
export default function authorpage(){
    return(
        <React.Fragment>
            <Navbar/>
            <Author/>
        </React.Fragment>
    )
}