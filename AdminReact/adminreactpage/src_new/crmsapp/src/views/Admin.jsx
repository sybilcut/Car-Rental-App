import React, {Component} from "react";
import Branches from './Branches';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";

class Admin extends Component{
    //YOUR CODE HERE
    branchClick(){
        alert("clicked");
        
    }

    render(){
        return(
            //YOUR CODE HERE
            <div>
                <h1>Admin</h1>
                
                <Link to="/Branches"><button>Manage Branches</button></Link>
                
            
            </div>
        )
    }

}


export default Admin;