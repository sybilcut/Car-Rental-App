import React, { Component } from "react"
import './App.css';
import Navibar from './components/Navibar';
import 'bootstrap/dist/css/bootstrap.min.css';



class App extends Component {
    
    render(){
      return (
       <div className="App">
         <Navibar/>
       </div>

      );
    }
  };


//closing statement
export default App;