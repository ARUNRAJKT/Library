import React from "react"; 
import Navbar from "../components/navbar";
import Viewbook from "../components/viewbook";
export default function mainpage(){
    return( <React.Fragment>
             <Navbar/><br />
             <Viewbook/>
            </React.Fragment>
          )
   
}