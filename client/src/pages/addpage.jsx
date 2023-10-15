import React from "react";
import Navbar from "../components/navbar";
import Addbook from "../components/addbook";
export default function addpage(){
    return(
        <React.Fragment>
            <Navbar/>
            <Addbook/>
        </React.Fragment>
    )
}