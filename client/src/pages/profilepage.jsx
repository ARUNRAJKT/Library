import React from "react"; 
import Navbar from "../components/navbar";
import Profile from "../components/profile";
export default function mainpage(){
    return( <React.Fragment>
             <Navbar/><br />
             <Profile/>
            </React.Fragment>
          )
   
}